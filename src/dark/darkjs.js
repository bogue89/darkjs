import Settings from './darkjs.settings.js';
import Elements from './darkjs.elements.js';

class Darkjs {
  constructor(element, options = {}) {
    this.root = element;
    this.animate = options.animate ?? true;
    this.offset = options.offset ?? 10;
    this.className = options.className || "darkjs";
    this.storeKey = options.storeKey ?? "darkmode";
    this.darkThreshold = options.darkThreshold ?? 0.3;
    this.brightThreshold = options.brightThreshold ?? 0.7;
    this.background_props = options.backgroundProps ?? ['background-color']
    this.exclude_elements = options.exclude_elements ?? ['style', 'script', 'img', 'text', 'video', 'audio'];
    
    this.isDark = false;
    this.colors = {};
    this.observer = new MutationObserver(this.onChange.bind(this));
    this.observer.observe(this.root, {
      attributes: true,
      childList: true,
      subtree: true
    });
    this.init();
  }
  init() {
    this.root.addClass(this.className);
    let darkem = Settings.readCookie(this.storeKey);
    if(darkem === null) {
      darkem = Settings.isDarkmode();
    }
    if(darkem>0) {
      const styles = Settings.readStorage(this.storeKey);
      if(styles) {
        this.styles = Elements.createStylesFromText(styles, this.className);
        this.isDark = true;
        this.isMutating = true;
        this.addStyles();
        setTimeout(() => this.isMutating = false, 1);
      }
    }
  }
  getStyles() {
    this.styles = Elements.createStylesForElement(this.root, 
      this.className,
      this.background_props, 
      this.exclude_elements, 
      this.darkThreshold, 
      this.brightThreshold,
      this.offset,
      this.animate);
  }
  addStyles() {
    if(!this.styles) return;
    document.head.append(this.styles);
  }
  removeStyles() {
    if(!this.styles) return;
    this.styles.remove();
  }
  darkem(animate) {
    this.isDark = true;
    this.isMutating = true;
    this.removeStyles();
    this.getStyles();
    this.addStyles();
    setTimeout(() => this.isMutating = false, 1);
    Settings.writeCookie(this.storeKey, 1);
    Settings.writeStorage(this.storeKey, this.styles.getText());
  }
  darkemnt() {
    this.isDark = false;
    if(this.styles) {
      this.styles.remove();
    }
    Settings.writeCookie(this.storeKey, 0);
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