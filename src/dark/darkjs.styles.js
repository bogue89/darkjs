import create from '../utils/elements.js';
import parse from '../utils/parse.js';
import colorjs from '../utils/color.js';
import Colors from './darkjs.colors.js';

const props = {
  'background-color': 'bg',
  'fill': 'fl',
  'stroke': 'st',
  'color': 'cl',
  'border-top-color': 'bt',
  'border-right-color': 'br',
  'border-bottom-color': 'bb',
  'border-left-color': 'bl'
};
const propClass   = "{className}-{prop}-{level}";
const propStyle   = "{path}.{className}.{styleClass}, {path}.{className} .{styleClass} { {prop}: {color} !important; } \n";

function createPropClass(prop, level, className) {
  return parse(propClass, {
    className,
    level,
    prop: props[prop],
  });
}
function createPropStyle(prop, color, level, path, className) {
  return parse(propStyle, {
      path,
      className,
      prop,
      color,
      styleClass: createPropClass(prop, level, className),
    });
}
function createStylePropsForColor(color, level, path, className) {
  let stylesProps = "";
  Object.keys(props).forEach((prop) => {
    stylesProps += createPropStyle(prop, color, level, path, className);
  });
  return stylesProps;
}
function createStylesForColors(colors, path, className, offset, animated) {
    const styles = create('style[class='+className+']');
    if(animated) {
      styles.addText(parse(".{className} { transition: all .2s ease !important; } \n", { className }));
    }
    colors.forEach((rgba, n)  => {
      const color = Colors.invertBrightness(colorjs(rgba), offset);
      styles.addText(createStylePropsForColor(color, n+1, path, className));
    });
    return styles;
}
function addStylesToElementForColors(element, colors, path, className, offset = 0, animated = true) {
  removeStyleInElement(element, className);
  const styles = createStylesForColors(colors, path, className, offset, animated);
  element.insert(styles, 0);
}
function addClassesToElement(element, className, colors, background_props, exclude_elements, darkThreshold, brightThreshold) {
  const levels = Object.values(colors);
  Object.keys(props).forEach(function(prop) {
      const string = element.getStyle(prop);
      const color = colors[string];
      if(color) {
        const isApplicable = background_props.indexOf(prop)<0 ? Colors.isDark(color, darkThreshold):Colors.isBright(color, brightThreshold);
        if(isApplicable) {
          const level = levels.indexOf(color);
          element
            .addClass(className)
            .addClass(createPropClass(prop, level+1, className));
        }
      }
    });
    const childs = element.children;
    for(var i=0; i<childs.length; i++) {
      const child = childs[i];
      if(exclude_elements.indexOf(child.nodeName)<0) {
        addClassesToElement(child, className, colors, background_props, exclude_elements, darkThreshold, brightThreshold);
      }
    }
}
function removeStyleInElement(element, className) {
  const childs = element.children;
  for(var i=0; i<childs.length; i++) {
    const child = childs[i];
    if(child.nodeName == 'STYLE' && child.className.match(className)) {
      child.remove();
    }
  }
}
function removeStyleClassesInElement(element, className) {
  element.removeClassMatching(className+"-[\\w\-]+");
  const childs = element.querySelectorAll ('.'+className) || [];
  for(var i=0; i<childs.length; i++) {
    removeStyleClassesInElement(childs[i], className);
  }
}
export default {
  props,
  addStylesToElementForColors,
  addClassesToElement,
  removeStyleClassesInElement
};