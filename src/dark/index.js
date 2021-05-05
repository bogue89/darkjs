import '../utils/objects.extensions.js';
import Darkjs from './darkjs.js';

if(!window.Darkjs) {
    window.Darkjs = Darkjs;
    window.Darkjs.options = {};
    document.querySelectorAll('script').forEach(script => {
        if(/\/darkjs[\@\d\.]*\.js\?/.test(script.src)) {
            window.Darkjs.options = {...window.Darkjs.options, ...{}.fromQueryString(script.src.split('?').pop())}
        }
    });
    window.Darkjs.callback = window[window.Darkjs.options.callback];
    if(!window.Darkjs.callback) {
        window.Darkjs.callback = function() {
            document.body.darkjs = new Darkjs(document.body, window.Darkjs.options);
        }
    }
    window.Darkjs.callback();
}