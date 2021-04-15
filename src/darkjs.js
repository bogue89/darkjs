import create from './elements.js';
import parse from './parse.js';
import colorjs from './color.js';
import darkjscss from './darkjs.css';

const style_class = "{class}-{prop}-{level}";
const style_def = "{path}.{class}.{class}-{prop}-{level}, {path}.{class} .{class}-{prop}-{level} { {prop}: {color} !important; } \n";
const style_props = ['background-color', 'color', 'border-top', 'border-right-color', 'border-bottom-color', 'border-left-color'];

class Darkjs {
  constructor(element) {
    this.root = element;
    this.isDark = false;
    this.levels = null;
    this.tree = null;
    this.className = "darkjs";
    this.styles = null;
  }
  getLevels() {
    this.levels = {};
    var n = 1;
    (new Set(this.getLevelForElement(this.root).sort((a,b) => b - a))).forEach((level) => {
      this.levels[level] = n;
      n += 1;
    });
    this.styles = create('style');
    const keys = Object.keys(this.levels);
    var black = colorjs("0,0,0");
    for(var i=0; i<keys.length; i++) {
      const level = keys[i];
      black.lightness = parseFloat((100 - level)/100);
      const rgba = black.toRgba();
      const path = this.root.getPath();
      style_props.forEach(function(prop, n) {
        this.styles.addText(parse(style_def, {
          'prop': prop,
          'path': path,
          'class': this.className,
          'level': this.levels[level],
          'color': rgba
        }))
      }.bind(this));
    }
    this.root.insert(this.styles);
  }
  getLevelForElement(element) {
    var levels = [];
    var color;
    
    style_props.forEach(function(prop, n) {
      color = colorjs(element.getStyle(prop));
      if(
        this.hasColor(color) &&
        (
          (n===0 && !this.isDarkColor(color)) ||
          (n>0 && this.isDarkColor(color))
        )
        ) {
        levels.push(this.colorLevel(color));
      }
    }.bind(this));
    const childs = element.children;
    for(var i=0; i<childs.length; i++) {
      levels = levels.concat(this.getLevelForElement(childs[i]));
    }
    return levels;
  }
  setLevelsToElement(element) {
    var color;
    style_props.forEach(function(prop, n) {
      color = colorjs(element.getStyle(prop));
      const level = this.levels[this.colorLevel(color)];
      if(
        level && 
        this.hasColor(color) &&
        (
          (n===0 && !this.isDarkColor(color)) ||
          (n>0 && this.isDarkColor(color))
        )
        ) {
        element
        .addClass(this.className)
        .addClass(parse(style_class, { 'class': this.className, 'prop': prop, 'level': level}));
      }
    }.bind(this));
    const childs = element.children;
    for(var i=0; i<childs.length; i++) {
      this.setLevelsToElement(childs[i]);
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
    if(!this.levels) {
      this.getLevels();
    }
    this.setLevelsToElement(this.root);
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
  colorLevel(color) {
    return Math.round(color.lightness * 100) || 0;
  }
  hasColor(color) {
    return color.alpha > 0;
  }
  isDarkColor(color) {
    return color.alpha > 0.3 && color.lightness < 0.5;
  }
}
export default Darkjs;