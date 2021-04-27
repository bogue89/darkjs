import create   from '../utils/elements.js';
import parse    from '../utils/parse.js';
import colorjs  from '../utils/color.js';

import Styles   from './darkjs.styles.js';
import Colors   from './darkjs.colors.js';

class Darkjs {
  constructor(element, options = {}) {
    this.root = element;
    this.animate = options.animate ?? true;
    this.offset = options.offset ?? 10;
    this.className = options.className || "darkjs";
    this.darkThreshold = options.darkThreshold ?? 0.3;
    this.brightThreshold = options.brightThreshold ?? 0.7;
    this.background_props = options.backgroundProps ?? ['fill', 'background-color']
    this.exclude_elements = options.exclude_elements ?? ['STYLE', 'SCRIPT', 'IMG', '#text', 'VIDEO', 'AUDIO'];
    
    this.observer = new MutationObserver(this.onChange.bind(this));
    this.isDark = false;
    this.colors = {};
  }
  darkem() {
    this.colors = {...this.colors, ...Colors.colorsInElement(this.root, this.brightThreshold, this.darkThreshold)};
    Styles.addStylesToElementForColors(this.root, Object.keys(this.colors), this.root.getPath(), this.className, this.offset, this.animate);
    Styles.addClassesToElement(this.root, this.className, this.colors, this.background_props, this.exclude_elements, this.darkThreshold, this.brightThreshold);

    this.isDark = true;
    this.observer.observe(this.root, {
      attributes: true,
      childList: true,
      characterData: false
    });
  }
  darkemnt() {
    Styles.removeStyleClassesInElement(this.root, this.className);
    this.colors = {};
    this.isDark = false;
  }
  toggle() {
    if(this.isDark) {
      this.darkemnt();
    } else {
      this.darkem();
    }
  }
  onChange() {
    if(!this.isDark) return;
    this.darkem();
    this.observer.disconnect();    
  }
}
export default Darkjs;