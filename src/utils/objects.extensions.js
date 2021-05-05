import './strings.extensions.js';

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
        if(kv.length > 1) {
            object[kv[0].url_decode()] = kv[1].url_decode();
        }
    })
    return object;
}