import create from './utils/elements.js';
import parse from './utils/parse.js';
import colorjs from './utils/color.js';

const style_class = "{class}-{prop}-{level}";
const style_def = "{path}.{class}.{style_class}, {path}.{class} .{style_class} { {prop}: {color} !important; } \n";
const style_props = {
  'background-color': 'bg',
  'fill': 'fl',
  'stroke': 'st',
  'color': 'cl',
  'border-top-color': 'bt',
  'border-right-color': 'br',
  'border-bottom-color': 'bb',
  'border-left-color': 'bl'
};
const background_props = ['background-color', 'background'];

class Darkjs {
  constructor(element, options = {}) {
    this.root = element;
    this.isDark = false;
    this.colors = {};
    this.offset = options.offset ?? 10;
    this.className = options.className || "darkjs";
    this.darkThreshold = options.darkThreshold ?? 0.3;
    this.brightThreshold = options.brightThreshold ?? 0.7;
  }
  getColorsForRoot() {
    this.colors = {}
    this.getColorsFromElement(this.root);
    this.colors = this.filterColors();
  }
  getColorsFromElement(element) {  
    Object.keys(style_props).forEach(function(prop, n) {
      const string = element.getStyle(prop);
      if(/rgb/.test(string) && !this.colors[string]) {
        this.colors[string] = colorjs(string);
      }
    }.bind(this));
    const childs = element.children;
    for(var i=0; i<childs.length; i++) {
      this.getColorsFromElement(childs[i]);
    }
  }
  filterColors() {
    const colors = {};
    Object.keys(this.colors).forEach(function(key) {
      const color = this.colors[key];
      if(this.hasColor(color) && (this.is2Bright(color) || this.is2Dark(color))) {
        colors[key] = color;
      }
    }.bind(this));
    return colors;
  }
  addSylesForColors() {
    this.removeStylesFromElement(this.root);
    this.root.insert(this.creteStylesWithColors(this.colors), 0);
  }
  removeStylesFromElement(element) {
    element.childNodes.forEach((e) => {
      if(e.tagName=="STYLE" && e.className.match(this.className)) {
        e.remove();
      }
    });
  }
  creteStylesWithColors(colors) {
    const styles = create('style[class='+this.className+']');
    styles.addText(parse(".{class} { transition: all .2s ease !important; } \n", {class: this.className }));
    Object.keys(colors).forEach(function(rgba) {
      styles.addText(this.createStylePropsForColor(colorjs(rgba), this.getColorLevel(colors[rgba])));
    }.bind(this));
    return styles;
  }
  createStylePropsForColor(color, level) {
    const path = this.root.getPath();
    var stylesProps = "";
    color.lightness = this.invertLightness(color.lightness);
    Object.keys(style_props).forEach(function(prop, n) {
      stylesProps += this.createStyleDef(path, this.className, prop, level, color);
    }.bind(this));
    return stylesProps;
  }
  createStyleDef(path, className, prop, level, color) {
    return parse(style_def, {
        'path': path,
        'class': className,
        'style_class': parse(style_class, {
          'class': className,
          'prop': style_props[prop],
          'level': level
        }),
        'prop': prop,
        'color': color.toRgba(),
      });
  }
  addDarkClassToRoot() {
    this.addDarkClassToElement(this.root);
  }
  addDarkClassToElement(element) {
    Object.keys(style_props).forEach(function(prop, n) {
      const string = element.getStyle(prop);
      const color = this.colors[string];
      
      if(color && this.colorRule(color, prop)) {
        const level = this.getColorLevel(color);
        element
        .addClass(this.className)
        .addClass(parse(style_class, {
          'class': this.className,
          'prop': style_props[prop],
          'level': level
        }));
      }
    }.bind(this));
    const childs = element.children;
    for(var i=0; i<childs.length; i++) {
      this.addDarkClassToElement(childs[i]);
    }
  }
  removeClassToElement(element) {
    element.removeClassMatching(this.className+"-[\\w\-]+");
    const childs = element.querySelectorAll ('.'+this.className) || [];
    for(var i=0; i<childs.length; i++) {
      this.removeClassToElement(childs[i]);
    }
  }
  darkem() {
    this.getColorsForRoot();
    this.addSylesForColors();
    this.addDarkClassToRoot();
    this.isDark = true;
  }
  darkemnt() {
    this.removeClassToElement(this.root);
    this.isDark = false;
  }
  toggle() {
    if(this.isDark) {
      this.darkemnt();
    } else {
      this.darkem();
    }
  }
  getColorLevel(color) {
    return Object.values(this.colors).indexOf(color)+1;
  }
  getColorHex(color) {
    return color.toHexa().replace('#','');
  }
  colorRule(color, prop) {
    const hasColor = this.hasColor(color);
    if(background_props.indexOf(prop) >= 0) {
      return hasColor && this.is2Bright(color);
    } else {
      return hasColor && this.is2Dark(color);
    }
  }
  invertLightness(lightness) {
    return 1+(this.offset/100) - lightness;
  }
  hasColor(color) {
    return color.alpha > 0;
  }
  is2Dark(color) {
    return color.lightness < this.darkThreshold;
  }
  is2Bright(color) {
    return color.lightness > this.brightThreshold;
  }
}
export default Darkjs;