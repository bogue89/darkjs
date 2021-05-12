import '../utils/cookies.js';

function setState(key, val) {
    writeCookie(key, val ? 1:0);
    writeStorage(key, val);
}
function getState(key) {
    return readCookie(key) > 0 ? readStorage(key):null;
}
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
function readStorage(key) {
    if(!key) return;
    if(typeof(Storage) !== "undefined") {
        return window.localStorage.getItem(key);
    } else {
        return readCookie(key);
    }
}
function writeStorage(key, val) {
    if(!key) return;
    if(typeof(Storage) !== "undefined") {
		window.localStorage.setItem(key, val);
	} else {
        writeCookie(key, val);
    }
}
export default {setState, getState, isDarkmode};