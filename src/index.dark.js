import create from './domelements.js';
import darkjs from './darkjs.js';

window.on('load', function() {
    darkjs.darkem(document.body);
});