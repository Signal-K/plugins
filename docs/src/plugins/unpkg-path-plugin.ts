import axios from 'axios';
import * as esbuild from 'esbuild-wasm';

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

                const { data, request } = await axios.get(args.path); // data now contains the text content of the index.js file of the desired package
                console.log(data);
                console.log(request);
                return {
                    loader: 'jsx', // apply jsx loader - parse jsx inside the file retrieved
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname, // resolveDir - the directory of the file retrieved
                }
            });
        },
    };
};