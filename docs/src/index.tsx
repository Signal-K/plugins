import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { start } from 'repl';

const App = () => {
    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState(''); // Transpiled & bundled code input

    // Initalise esbuild web assembly compiler
    const startService = async () => {
        /*const service = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
        //console.log(service); */
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
    }

    useEffect(() => {
        startService();
    }, []);

    // Event handler for submit function
    const onClick = async () => {
        console.log(input);

        // Don't transpile until service is initialised
        if (!ref.current) {
            return;
        }

        //console.log(ref.current);
        const result = await ref.current.transform(input, {
            loader: 'jsx', // Use JSX loader -> the code in the input will be transpiled to/as JSX
            target: 'es2015'
        });

        console.log(result);
        setCode(result.code); // update code piece of state. This will be the code that is bundled. Page reloads and the code is rendered in the pre.
    };

    return <div>
        <textarea value={input} onChange={e => setInput(e.target.value)}></textarea> {/* When the user types in here, update the state */}
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre> {/* Container for the code/function boxes */}
    </div>
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);