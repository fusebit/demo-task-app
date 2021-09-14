import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './components/index'

const result = ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// @ts-ignore
console.log(`Most recent build was at: ${LAST_BUILD_TIME}`);
// @ts-ignore
console.log(`Environment variables loaded are:`, env);
