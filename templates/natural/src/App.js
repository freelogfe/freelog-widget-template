import './index.less';
import logo from './logo.svg';

export default function App(shadow) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');
    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0);
    const info = document.createElement('h3');
    info.setAttribute('class', 'info');

    info.textContent = 'Hello Freelog !';

    const imgUrl = logo;
    const img = document.createElement('img');
    img.src = imgUrl;
    icon.appendChild(img);

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
