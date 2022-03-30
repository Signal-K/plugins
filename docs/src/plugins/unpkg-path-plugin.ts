import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
    name: 'filecache', // name of the db
});

/*
Testing an immediately invoked function to invoke indexedDB
(async () => {
    await fileCache.setItem('color', 'red');

    // Retrieve the key
    const color = await fileCache.getItem('color');
    console.log(color);
})()*/

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log('onResole', args); // onResolve - figure out where the file is
                if (args.path === 'index.js') {
                    return { path: args.path, namespace: 'a' };
                }

                // URL joiner - to navigate to the correct file based on path in the desired module. Joining the url between unpkg and the path
                if (args.path.includes('./' || args.path.includes('../'))) {
                    return {
                        namespace: 'a',
                        //path: new URL(args.path, args.importer + '/').href, // Connect the path of the module to import to the file created by the end user (which is being imported -> importer)
                        path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href,
                    }
                }

                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`,
                }
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);

                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: `
                import React, { useState } from 'react';
                const reactDOM = require('react-dom');
                console.log(react, useState, reactDOM);
                `,
                    };
                }

                // Check to see if the module/file has already been fetched and if it is in the cache
                // Return file immediately if it is in the cache
                const cachedResult = await fileCache.getItem(args.path); // If result is null, it hasn't been fetched and then put in the cache
                if (cachedResult) {
                    return cachedResult;
                }
                // If file is not in the cache
                const { data, request } = await axios.get(args.path); // data now contains the text content of the index.js file of the desired package
                // Return object to console
                console.log(data);
                console.log(request);
                // Store response in cache -> `args.path` is the key
                const result = {
                    loader: 'jsx', // apply jsx loader - parse jsx inside the file retrieved
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname, // resolveDir - the directory of the file retrieved
                }
                // store response in cache 2
                await fileCache.setItem(args.path, result);
                return result;
            });
        },
    };
};