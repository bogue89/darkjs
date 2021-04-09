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
        element.className = classes.join('').replace(/\./g, ' ').trim();
    }
    if(attributes) {
        attributes.forEach((attribute) => {
            var attr = attribute.replace(/\[|\]/g, '').split('='); 
            element.setAttribute(attr[0], attr[1] || "");
        })
    }
    return element;
}
Element.prototype.hasClass = function (cls) {
    return !!this.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
Element.prototype.addClass = function (cls) {
    if(!this.hasClass(cls)) {
        this.className = (this.className+" "+cls).trim();
    }
    return this;
}
Element.prototype.removeClass = function (cls) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    this.className=this.className.replace(reg,' ').trim();
    return this;
}
Element.prototype.create = function(html) {
    var temp = document.createElement('div');
    temp.innerHTML = html.trim();
    return temp.childNodes.length > 1 ? temp.childNodes:temp.firstChild;
}
Element.prototype.insert = function(el, position) {
    if(this.childNodes.length>0 && position<this.childNodes.length && position !== 'bottom') {
        if(position === 'top') {
            position = 0;
        }
        this.insertBefore(el, this.childNodes[position]);
    } else {
        this.appendChild(el);
    }
    return this;
}
Element.prototype.before = function(el, reference) {
    var parent = this.parentNode;
    var position = Array.prototype.indexOf.call(parent.childNodes, this) - 1;
    parent.insert(el, position);
    return this;
}
Element.prototype.after = function(el, reference) {
    var parent = this.parentNode;
    var position = Array.prototype.indexOf.call(parent.childNodes, reference) + 1;
    return parent.insert(el, position);
}
Element.prototype.remove = function(){
    var parent = this.parentNode;
    if(parent) {
        parent.removeChild(this);
    }
}
Element.prototype.contains = function(target) {
    if(this == target) {
        return true;
    }
    if(target) {
        return this.contains(target.parentNode);
    }
    return false;
}
Element.prototype.setText = function(text) {
    this.innerText = text;
    return this;
}
Element.prototype.addText = function(text) {
    this.innerText = this.innerText + text;
    return this;
}
Element.prototype.setHtml = function(html) {
    this.innerHTML = html;
    return this;
}
Element.prototype.addText = function(html) {
    this.innerHTML = this.innerHTML + html;
    return this;
}
Element.prototype.on = function(event, callback, useCapture) {
    this.addEventListener(event, callback.bind(this), useCapture);
    return this;
}
Window.prototype.on = Element.prototype.on;
Element.prototype.styles = null;
Element.prototype.getStyle = function(prop) {
  if(!this.styles) {
    this.styles = window.getComputedStyle(this, null);
  }
  return this.styles.getPropertyValue(prop);
};
export default element;