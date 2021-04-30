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
    this.exclude_elements = options.exclude_elements ?? ['style', 'script', 'img', 'text', 'video', 'audio'];
    
    this.isDark = false;
    this.colors = {};

    this.observer = new MutationObserver(this.onChange.bind(this));
    this.observer.observe(this.root, {
      attributes: true,
      childList: true,
      subtree: true
    });
  }
  darkem(animate) {
    this.colors = {...this.colors, ...Colors.colorsInElement(this.root, this.className, this.brightThreshold, this.darkThreshold)};
    //console.log(this.root.getTag(), Object.keys(this.colors));
    Styles.addStylesToElement(this.root, 
      this.className,
      this.colors,
      this.background_props, 
      this.exclude_elements, 
      this.darkThreshold, 
      this.brightThreshold,
      this.offset,
      animate ?? this.animate
    );
    this.isDark = true;
  }
  darkemnt() {
    this.isDark = false;
    Styles.removeStylesFromElement(this.root, this.className);
    this.colors = {};
  }
  toggle() {
    if(this.isDark) {
      this.darkemnt();
    } else {
      this.darkem();
    }
  }
  onChange(mutationsList, observe) {
    let isNested = false;
    for(const mutation of mutationsList) {
      if(this.isOwnMutation(mutation.target)) {
        isNested = true;
      }
    }
    if(!this.isDark || this.isMutating || isNested) return;
    this.isMutating = true;
    this.darkem(false);
    setTimeout(() => this.isMutating = false, 1);
  }
  isOwnMutation(element) {
    return element!=this.root && (element.hasClass(this.className) || this.isOwnMutation(element.parentNode));
  }
}
export default Darkjs;