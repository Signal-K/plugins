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

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

                if (cachedResult) {
                    return cachedResult;
                }
            })

            build.onLoad({ filter: /.css$/ }, async (args: any) => {

                const { data, request } = await axios.get(args.path);
                const escaped = data
                    .replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
                const contents = `
                        const style = document.createElement('style');
                        style.innerText = '${escaped}';
                        document.head.appendChild(style);
                    `

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', request.responseURL).pathname,
                }
                await fileCache.setItem(args.path, result);
                return result;
            })

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);
                // If file is not in the cache
                const { data, request } = await axios.get(args.path); // data now contains the text content of the index.js file of the desired package

                // Store response in cache -> `args.path` is the key
                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname, // resolveDir - the directory of the file retrieved
                }
                // store response in cache 2
                await fileCache.setItem(args.path, result); // args.path is the key
                return result;
            });
        }
    }
}