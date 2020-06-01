import cssStr from './index.css';
import App from './App';

class App extends HTMLElement {
    constructor() {
        super();

        {{#if enableShadowDom}}
        const shadow = this.attachShadow({mode: 'open'});
        {{else}}
        const shadow = this.attachShadow({mode: 'closed'});
        {{/if}}

        const style = document.createElement('style');
        style.textContent = cssStr;
        shadow.appendChild(style);

        const wrapper = App();
        shadow.appendChild(wrapper);

    }

    connectedCallback() {

    }
}


customElements.define('{{name}}', App);
