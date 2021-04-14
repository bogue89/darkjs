import create from './elements.js';
import Darkjs from './darkjs.js';

window.on('load', function() {
    setTimeout(function() {
        window.darkjs = new Darkjs(document.querySelector('body'));
        window.darkjs.darkem();
    }, 1000)
});