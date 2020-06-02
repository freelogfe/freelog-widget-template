import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import cssStr from './index.less';

class CustomElement extends HTMLElement {
    connectedCallback() {
        const wrapper = document.createElement('div');
        const shadow = this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        style.textContent = cssStr;
        shadow.appendChild(style);
        ReactDOM.render(<App/>, wrapper);

        shadow.appendChild(wrapper);
    }
}

customElements.define('{{name}}', CustomElement);
