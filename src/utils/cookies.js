import "./strings.extensions.js";

document.readCookie = function(key) {
    const matches = (" "+document.cookie).match(new RegExp(`\\s${key.url_encode()}=([^;]+)`));
    if(matches) {
        return matches[1].url_decode();
    }
    return null;
}
document.deleteCookie = function(key) {
    return document.writeCookie(key, null, {duration: 0});
}
document.writeCookie = function(key, val, options={}) {
    val = ""+val;
    const path = options.path || "/"; //days
    const samesite = options.samesite || "None";
    const expires = options.expires || (function(days) {
        let date = new Date();
        date.setTime(date.getTime() + days*24*60*60*1000);
        return date;
    })(options.duration ?? 7);
    document.cookie = `${key.url_encode()}=${val.url_encode()}; expires=${expires.toUTCString()}; path=${path}; SameSite=${samesite}`;
}