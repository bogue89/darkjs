import query from '../utils/query.js';
import Darkjs from './darkjs.js';

const s = document.querySelector(`script[src*="darkjs.js"]`);

Darkjs.options = query.fromQueryString(s.src.split('?').pop());
Darkjs.callback = window[Darkjs.options.callback] || function() {
    if(!Darkjs.default) {
        Darkjs.default = new Darkjs(null, Darkjs.options);
    }
    if(document.body) {
        Darkjs.default.root = document.body;
        Darkjs.default.init();
    } else {
        setTimeout(Darkjs.callback);
    }
};
if(!window.Darkjs) {
    window.Darkjs = Darkjs;
}
window.Darkjs.callback(Darkjs, Darkjs.options);