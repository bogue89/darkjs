import './strings.extensions.js';

function toQueryString(object) {
    let query = [];
    Object.keys(object).forEach((key) => {
        query.push([(key+"").url_encode(), (object[key]+"").url_encode()].join('='));
    })
    return query.join('&');
}
function fromQueryString(string) {
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
export default {toQueryString, fromQueryString}