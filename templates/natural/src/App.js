import cssStr from './index.css';
import logo from './logo.svg';

export default class App extends HTMLElement {
    constructor() {
        super();

        {{#if enableShadowDom}}
        const shadow = this.attachShadow({mode: 'open'});
        {{else}}
        const shadow = this.attachShadow({mode: 'closed'});
        {{/if}}

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
        const icon = document.createElement('span');
        icon.setAttribute('class', 'icon');
        icon.setAttribute('tabindex', 0);
        const info = document.createElement('h3');
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

        const info1 = document.createElement('div');
        info1.textContent = 'Create with Natural';
        wrapper.appendChild(info1);

        const info2 = document.createElement('div');
        info2.textContent = 'Build as Web Component';
        wrapper.appendChild(info2);

        const info3 = document.createElement('div');
        info3.textContent = 'Use it anywhere!';
        wrapper.appendChild(info3);
    }

    connectedCallback() {

    }
}



