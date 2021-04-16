import create from '../utils/elements.extensions.js';
import Darkjs from '../darkjs.js';

window.on('load', function() {
    setTimeout(function() {
        window.darkjs = new Darkjs(document.querySelector('body'));
        window.darkjs.darkem();
    }, 500)
});