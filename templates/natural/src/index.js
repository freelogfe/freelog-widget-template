const cssStr = require('./index.css');
import logo from './logo.svg';

class App extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: {{#if enableShadowDom}}'open'{{else}}'closed'{{/if}}});

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
        const icon = document.createElement('span');
        icon.setAttribute('class', 'icon');
        icon.setAttribute('tabindex', 0);
        const info = document.createElement('span');
        info.setAttribute('class', 'info');

        info.textContent = 'Hello Freelog !';

        let imgUrl;
        if (this.hasAttribute('img')) {
            imgUrl = this.getAttribute('img');
        } else {
            imgUrl = logo;
        }
        const img = document.createElement('img');
        img.src = imgUrl;
        icon.appendChild(img);

        var style = document.createElement('style');

        style.textContent = cssStr;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(icon);
        wrapper.appendChild(info);
    }

    connectedCallback() {

    }
}


customElements.define('{{name}}', App);
