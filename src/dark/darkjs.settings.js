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
function readStorage(key) {
    if(!key) return;
    if(typeof(Storage) !== "undefined") {
        return window.localStorage.getItem(key);
    } else {
        return this.readCookie(key);
    }
}
function writeStorage(key, val) {
    if(!key) return;
    if(typeof(Storage) !== "undefined") {
		window.localStorage.setItem(key, val);
	} else {
        this.writeCookie(key, val);
    }
}
export default {isDarkmode, readCookie, writeCookie, readStorage, writeStorage};