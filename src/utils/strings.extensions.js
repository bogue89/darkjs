String.prototype.url_encode = function() {
    return encodeURIComponent(this);
}
String.prototype.url_decode = function() {
    return decodeURIComponent(this);
}