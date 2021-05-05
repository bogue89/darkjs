import '../utils/cookies.js';

function isDarkmode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
function readCookie(key) {
    if(!key) return;
    return document.readCookie(key);
}
function writeCookie(key, val) {
    if(!key) return;
    return document.writeCookie(key, val);
}
export default {isDarkmode, readCookie, writeCookie};