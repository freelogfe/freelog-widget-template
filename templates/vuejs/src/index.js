import Vue from 'vue';
import vueCustomElement from 'vue-custom-element';
import App from './components/App.vue';

import shadowCss from './index.less';

Vue.use(vueCustomElement);

Vue.customElement('{{name}}', App, {
    shadow: true,
    shadowCss,
});