import create from './elements.js';
import parse from './parse.js';
import colorjs from './color.js';
import darkjscss from './darkjs.css';

const style_class = "{class}-{prop}-{level}";
const style_def = "{path}.{class}.{style_class}, {path}.{class} .{style_class} { {prop}: {color} !important; } \n";
const style_props = {
  'background-color': 'bg', 
  'color': 'cl',
  'border-top-color': 'bt',
  'border-right-color': 'br',
  'border-bottom-color': 'bb',
  'border-left-color': 'bl'
};

class Darkjs {
  constructor(element) {
    this.root = element;
    this.isDark = false;
    this.levels = null;
    this.tree = null;
    this.className = "darkjs";
    this.styles = null;
    this.offset = 5;
    this.darkThreshold = 0.3;
    this.brightThreshold = 0.7;
  }
  getLevels() {
    this.levels = {};
    var n = 1;
    (new Set(this.getLevelForElement(this.root).sort((a,b) => b - a))).forEach((level) => {
      this.levels[level] = n;
      n += 1;
    });
    this.styles = create('style');
    var black = colorjs("0,0,0");
    Object.keys(this.levels).forEach(function(level) {
      black.lightness = parseFloat((100+this.offset - level)/100);
      const rgba = black.toRgba();
      const path = this.root.getPath();
      Object.keys(style_props).forEach(function(prop, n) {
        this.styles.addText(parse(style_def, {
          'path': path,
          'class': this.className,
          'style_class': parse(style_class, {
            'class': this.className,
            'prop': style_props[prop],
            'level': this.levels[level]
          }),
          'prop': prop,
          'color': rgba,
        }))
      }.bind(this));
    }.bind(this));
    this.root.insert(this.styles);
  }
  getLevelForElement(element) {
    var levels = [];
    var color;
    
    Object.keys(style_props).forEach(function(prop, n) {
      color = colorjs(element.getStyle(prop));
      if(
        this.hasColor(color) &&
        (
          (n===0 && this.is2Bright(color)) ||
          (n>0 && this.is2Dark(color))
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
    Object.keys(style_props).forEach(function(prop, n) {
      color = colorjs(element.getStyle(prop));
      const level = this.levels[this.colorLevel(color)];
      if(
        level && 
        this.hasColor(color) &&
        (
          (n===0 && this.is2Bright(color)) ||
          (n>0 && this.is2Dark(color))
        )
        ) {
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
  is2Dark(color) {
    return color.lightness < this.darkThreshold;
  }
  is2Bright(color) {
    return color.lightness > this.brightThreshold;
  }
}
export default Darkjs;