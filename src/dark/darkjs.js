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
    

    this.isDark = true;
    this.isMutating = true;
    this.colors = {
      ...this.colors, 
      ...Colors.colorsInElement(this.root, this.className, this.brightThreshold, this.darkThreshold)
    };
    //console.log(this.root.getTag(), animate ?? this.animate);
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
    setTimeout(() => this.isMutating = false, 1);
  }
  darkemnt() {
    this.isDark = false;
    Styles.removeClassesInsideElement(this.root, this.className);
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
    if(!this.isDark || this.isMutating) return;
    for(const mutation of mutationsList) {
      if(this.isNestedMutation(mutation.target)) {
        return;
      }
    }
    this.darkem(false);
  }
  isNestedMutation(element) {
    return element!=this.root && (element.hasClass(this.className) || this.isNestedMutation(element.parentNode));
  }
}
export default Darkjs;