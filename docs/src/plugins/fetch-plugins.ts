import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
    name: 'filecache', // name of the db
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin', // Object name
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /(^index\.js$)/ }, () => { // Only used when the file matches the filter
                return {
                    loader: 'jsx',
                    contents: inputCode,
                };
            });

            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                if (cachedResult) {
                    return cachedResult;
                }

                const { data, request } = await axios.get(args.path);
                const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
                const escaped = data
                    .replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
                const contents = fileType === 'css' ?
                    `
                        const style = document.createElement('style');
                        style.innerText = '${escaped}';
                        document.head.appendChild(style);
                    ` : data

                const result = esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', request.responseURL).pathname,
                }
                await fileCache.setItem(args.path, result);
                return result;
            })

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);

                // Check to see if the module/file has already been fetched and if it is in the cache
                // Return file immediately if it is in the cache
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path); // If result is null, it hasn't been fetched and then put in the cache
                if (cachedResult) {
                    return cachedResult;
                }
                // If file is not in the cache
                const { data, request } = await axios.get(args.path); // data now contains the text content of the index.js file of the desired package

                const fileType = args.path.match(/.css$/) ? 'css' : 'jsx'; // If the file is a css file, use css loader otherwise default to jsx loader
                const escaped = data
                    .replace(/\n/g, '').replace(/"/g, '\\"') // Replace newline characters in CSS and escape the double quotes
                    .replace(/'/g, "\\'"); // Replace single quotes in JSX/css and escape them
                const contents = fileType === 'css' ?
                    `
                        const style = document.createElement('style');
                        style.innerText = '${escaped}';
                        document.head.appendChild(style);
                    ` : data // If the file is a css file, use css loader otherwise default to jsx loader
                // Store response in cache -> `args.path` is the key
                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', request.responseURL).pathname, // resolveDir - the directory of the file retrieved
                }
                // store response in cache 2
                await fileCache.setItem(args.path, result); // args.path is the key
                return result;
            });
        }
    }
}