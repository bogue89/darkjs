String.prototype.url_encode = function() {
    return encodeURIComponent(this);
}
String.prototype.url_decode = function() {
    return decodeURIComponent(this);
}
Object.prototype.toQueryString = function() {
    let query = [];
    Object.keys(this).forEach((key) => {
        query.push([(key+"").url_encode(), (this[key]+"").url_encode()].join('='));
    })
    return query.join('&');
}
Object.prototype.fromQueryString = function(string) {
    let object = {};
    if(!string) return object;
    const params = string.split('&');
    params.forEach((param) => {
        const kv = param.split('=');
        object[kv[0].url_decode()] = kv[1].url_decode();
    })
    return object;
}
function parse(string, params) {
    const keys = Object.keys(params);
    for(let i=0; i<keys.length; i++) {
        const key = keys[i];
        string = string.replace(new RegExp("{"+key+"}", "g"), params[key]);
    }
    return string.replace(new RegExp("{\\w+}", "g"), '');
}
export default parse;