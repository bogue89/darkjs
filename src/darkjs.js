import create from './elements.extensions.js';
import colorjs from './color.js';
import darkjscss from './darkjs.css';

class Darkjs {
  constructor(element) {
    this.root = element;
    this.isDark = false;
    this.levels = null;
    this.tree = null;
    this.className = "darkjs";
  }
  getLevels() {
    this.levels = {};
    var n = 1;
    (new Set(this.getLevelForElement(this.root).sort((a,b) => b - a))).forEach((level) => {
      this.levels[level] = n;
      n += 1;
    });
  }
  getLevelForElement(element) {
    var levels = [];
    var color;
    color = colorjs(element.getStyle('background-color'));
    if(this.hasColor(color) && !this.isDarkColor(color)) {
      levels.push(this.colorLevel(color));
    }
    color = colorjs(element.getStyle('color'));
    if(this.hasColor(color) && this.isDarkColor(color)) {
      levels.push(this.colorLevel(color));
    }
    const childs = element.children;
    for(var i=0; i<childs.length; i++) {
      levels = levels.concat(this.getLevelForElement(childs[i]));
    }
    return levels;
  }
  setLevelsToElement(element) {
    var color;
    color = colorjs(element.getStyle('background-color'));
    if(this.hasColor(color) && !this.isDarkColor(color)) {
      const level = this.levels[this.colorLevel(color)];
      element
      .addClass(this.className)
      .addClass(this.className+'-bg-'+level);
    }
    color = colorjs(element.getStyle('color'));
    if(this.hasColor(color) && this.isDarkColor(color)) {
      const level = this.levels[this.colorLevel(color)];
      element
      .addClass(this.className)
      .addClass(this.className+'-color-'+level);
    }
    const childs = element.children;
    for(var i=0; i<childs.length; i++) {
      this.setLevelsToElement(childs[i]);
    }
  }
  removeClassToElement(element) {
    element.removeClassMatching(this.className+"-[\\w\-]+");
    const childs = element.querySelectorAll ('[class*='+this.className+'-]') || [];
    for(var i=0; i<childs.length; i++) {
      this.removeClassToElement(childs[i]);
    }
  }
  darkem() {
    this.getLevels();
    this.setLevelsToElement(this.root);
    this.isDark = true;
    console.log(this.levels);
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
    return color.alpha > 0.3 && color.lightness < 0.7;
  }
}
export default Darkjs;