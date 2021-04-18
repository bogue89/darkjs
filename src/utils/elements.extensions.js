Element.prototype.setClass = function (cls) {
    this.setAttribute("class", cls || "")
    return this;
}
Element.prototype.getClass = function () {
    return this.getAttribute("class") || "";
}
Element.prototype.hasClass = function (cls) {
    return !!this.getClass().match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
Element.prototype.addClass = function (cls) {
    if(!this.hasClass(cls)) {
        this.setClass((this.getClass()+" "+cls).trim());
    }
    return this;
}
Element.prototype.removeClass = function (cls) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    this.setClass(this.getClass().replace(reg,' ').trim());
    return this;
}
Element.prototype.removeClassMatching = function (regex) {
    const clss = this.getClass().match(new RegExp(regex, 'g')) || [];
    for(var c=0; c<clss.length; c++) {
      this.removeClass(clss[c]);
    }
    return this;
}
Element.prototype.toHtml = function() {
    var tmp = document.createElement('div');
    tmp.appendChild(this);
    return tmp.innerHTML;
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
Element.prototype.addStyle = function(prop, value) {
  this.style[prop] = value;
  return this;
}
Element.prototype.setStyle = function(style) {
  this.setAttribute('style', style)
  return this;
}
Element.prototype.getStyle = function(prop) {
  if(!this.styles) {
    this.styles = window.getComputedStyle(this, null);
  }
  return this.styles.getPropertyValue(prop);
}
Element.prototype.getPath = function() {
  if(this.id!=='') {
    return '#'+this.id;
  }
  if (this===document.body) {
    return this.tagName.toLowerCase();
  }
  var n = 1;
  var siblings= this.parentNode.childNodes;
  for (var i= 0; i<siblings.length; i++) {
    var sibling= siblings[i];
    if (sibling===this) {
      return this.parentNode.getPath()+' > '+this.tagName.toLowerCase()+':nth-of-type('+n+')';
    }
    if (sibling.nodeType===1 && sibling.tagName===this.tagName) {
      n += 1;
    }
  }
}