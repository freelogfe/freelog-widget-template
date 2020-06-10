import React from 'react';
import logo from './logo.svg';
import './App.less';

const sampleList = [
    'Create with React',
    'Build as Web Component',
    'Use it anywhere!',
];

export default function App() {

    return (<div className="wrapper">
        <span><img src={logo} alt=""/></span>
        <h3 className="info">Hello Freelog !</h3>
        {
            sampleList.map(sample => (<div key={sample}>{sample}</div>))
        }
    </div>);
}
