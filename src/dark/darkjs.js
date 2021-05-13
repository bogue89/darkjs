import Settings from './darkjs.settings.js';
import Elements from './darkjs.elements.js';

class Darkjs {
  constructor(element, options = {}) {
    this.root = element;
    this.options = {
      mode: options.mode || "device",
      animate: options.animate ?? true,
      offset: options.offset ?? 10,
      className: options.className || "darkjs",
      storeKey: options.storeKey ?? "darkjs",
      darkThreshold: options.darkThreshold ?? 30,
      brightThreshold: options.brightThreshold ?? 70,
      background_props: options.backgroundProps ?? ['background-color'],
      exclude_elements: options.exclude_elements ?? ['style', 'script', 'img', 'text', 'video', 'audio'],
    };
    this.isDark = false;
    this.styles = Elements.createStylesElement(this.options.className);
    this.modes = {
      on: 'darkmode on',
      off: 'darkmode off',
      custom: 'darkmode state', //stored on cookie
      device: 'darktheme of device',
      //unknown: 'same as device device',
    };
    document.head.append(this.styles);
    this.init();
  }
  init() {
    this.addObserver();
    this.checkStoredState();
  }
  addObserver() {
    if(!this.root) return;
    this.root.addClass(this.options.className);
    this.observer = new MutationObserver(this.onChange.bind(this));
    this.observer.observe(this.root, {
      attributes: true,
      childList: true,
      subtree: true
    });
  }
  checkStoredState() {
    if(this.getDarkState()) {
      this.isDark = true;
      const styles = Settings.getState(this.options.storeKey);
      if(styles) {  
        this.styles.setHtml(styles);
      }
    }
  }
  getMode() {
    const mode = !!this.modes[this.options.mode] ? this.options.mode:"device";
    return mode;
  }
  setMode(mode) {
    const isValidMode = !!this.modes[mode];
    if(isValidMode) {
      this.options.mode = mode;
    }
    return isValidMode;
  }
  getDarkState() {
    switch(this.getMode()) {
      case "on":
        return true;
        break;
      case "off":
        return false;
        break;
      case "custom":
        return !!Settings.getState(this.options.storeKey);
        break;
      default:
        return Settings.isDarkmode();
        break;
    }
  }
  addStyles(animate) {
    this.styles.setHtml('');
    const transition = animate ? Elements.createTransitionForElement(this.root, this.options.className):'';
    const styles = Elements.createStylesForElement(this.root, 
      this.options.className,
      this.options.background_props, 
      this.options.exclude_elements, 
      this.options.darkThreshold, 
      this.options.brightThreshold,
      this.options.offset);
    this.styles.addHtml(transition);
    this.styles.addHtml(styles);
  }
  removeStyles(animate) {
    this.styles.setHtml(animate ? Elements.createTransitionForElement(this.root, this.options.className):'');
  }
  darkem(animate) {
    this.isDark = true;
    this.root.addClass(`${this.options.className}-on`);
    this.addStyles(animate ?? this.options.animate);
    Settings.setState(this.options.storeKey, this.styles.getText());
  }
  darkemnt() {
    this.isDark = false;
    this.isMutating = true;
    this.root.removeClass(`${this.options.className}-on`);
    this.removeStyles(this.options.animate);    
    Settings.setState(this.options.storeKey, '');
    setTimeout(() => this.isMutating = false);
  }
  toggle() {
    this.setMode(this.getDarkState() ? "off":"on");
    this.checkState();
  }
  checkState() {
    this.isMutating = true;
    if(this.getDarkState()) {
      this.darkem(!this.isDark);
    } else {
      this.darkemnt(this.isDark);
    }
    setTimeout(() => this.isMutating = false);
  }
  onChange(mutationsList, observe) { 
    if(this.isMutating) return;
    for(const mutation of mutationsList) {
      if(this.isNestedMutation(mutation.target)) {
        return;
      }
    }
    this.checkState();
  }
  isNestedMutation(element) {
    return element!=this.root && (element.hasClass(this.options.className) || this.isNestedMutation(element.parentNode));
  }
}
export default Darkjs;