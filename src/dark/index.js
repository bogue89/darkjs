import Darkjs from '../darkjs.js';

if(!window.Darkjs) {
    window.Darkjs = Darkjs;
    let params = {};
    document.querySelectorAll('script').forEach(script => {
        if(/darkjs\.js\?/.test(script.src)) {
            params = {...params, ...{}.fromQueryString(script.src.split('?').pop())}
        }
    })
    window.Darkjs.callback = window[params.callback];
    window.Darkjs.options = params;
    if(!window.Darkjs.callback) {
        window.Darkjs.callback = function() {
            window.addEventListener('load', function() {
                document.body.darkjs = new Darkjs(document.body, window.Darkjs.options);
                document.body.darkjs.darkem();
            });
        }
    }
    window.Darkjs.callback();
}
