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
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);

                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: inputCode, // Return the inputCode from the text box
                    };
                }

                // Check to see if the module/file has already been fetched and if it is in the cache
                // Return file immediately if it is in the cache
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path); // If result is null, it hasn't been fetched and then put in the cache
                if (cachedResult) {
                    return cachedResult;
                }
                // If file is not in the cache
                const { data, request } = await axios.get(args.path); // data now contains the text content of the index.js file of the desired package
                // Return object to console
                console.log(data);
                console.log(request);
                // Store response in cache -> `args.path` is the key
                const result: esbuild.OnLoadResult = {
                    loader: 'jsx', // apply jsx loader - parse jsx inside the file retrieved
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