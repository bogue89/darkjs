import './elements.js';
function element(selector) {
    const tag = selector.replace(/^(\w+).*/i,"$1");
    const element = document.createElement(tag);
    var id = selector.replace(/\[[^\[\]]+\]/g,'').match(/#[\w-]+/), 
    classes = selector.match(/\.([\w\-]+)/g), 
    attributes = selector.match(/\[[^\[\]]+\]/g);
    if(id) {
        element.id = id.join('').replace('#', '');
    }
    if(classes) {
        element.setClass(classes.join('').replace(/\./g, ' ').trim());
    }
    if(attributes) {
        attributes.forEach((attribute) => {
            var attr = attribute.replace(/\[|\]/g, '').split('='); 
            element.setAttribute(attr[0], attr[1] || "");
        })
    }
    return element;
}
export default element;