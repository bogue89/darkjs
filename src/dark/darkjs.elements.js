import Colors from './darkjs.colors.js';
import Styles from './darkjs.styles.js';

function createTransitionForElement(element, className) {
  return Styles.createTransitionForElement(element, className);
}
function createStylesElement(className) {
  return Styles.createStylesElement(className);
}
function createStylesForElement(element, className, background_props, exclude_elements, darkThreshold, brightThreshold, offset, animate) {  
  const styles = getStylesForColors(
    getPropColorsForElement(element,
      className,
      exclude_elements,
      darkThreshold,
      brightThreshold,
      {},
      offset),
    className,
    background_props,
    darkThreshold,
    brightThreshold,
    animate);
  return styles;
}
function getStylesForColors(colors, className, background_props, darkThreshold, brightThreshold, animate) {
  return Styles.createStylesForElement(colors, className, background_props, darkThreshold, brightThreshold, animate);
}

function getPropColorsForElement(element, className, exclude_elements, darkThreshold, brightThreshold, colors, offset) {
  return getFilterPropColors(
    getAllPropColorsForElement(
        element, 
        className, 
        exclude_elements, 
        colors,
        offset), 
    darkThreshold, 
    brightThreshold);
}
function getFilterPropColors(colors, darkThreshold, brightThreshold) {
  let filtered = {};
  Object.keys(colors).forEach( key => {
    const color = colors[key].color;
    if(Colors.isBright(color, brightThreshold) || Colors.isDark(color, darkThreshold)) {
      filtered[key] = colors[key];
    }
  })
  return filtered;
}
function getAllPropColorsForElement(element, className, exclude_elements, colors, offset) {
  Styles.getPropsForElement(element).forEach( prop => {
    const string = Styles.getColorStyle(element, prop);
    if(!string) return;

    const color = colorMap(colors, string, offset);
    const elements = elementsMap(color.elements, prop);
    elements.push(element);
  });
  
  const children = element.children;
  for(let i=0; i<children.length; i++) {
    const child = children[i];
    if(child.hasClass(className)==false && exclude_elements.indexOf(child.getTag())<0) {
      colors = getAllPropColorsForElement(child, className, exclude_elements, colors, offset);
    }
  }
  return colors;
}
function colorMap(colors, string, offset = 0) {
  if(!colors[string]) {
    colors[string] = {
      color: Colors.create(string),
      inverted: Colors.invertBrightness(Colors.create(string), offset),
      elements: {}
    };
  }
  return colors[string];
}
function elementsMap(elements, prop) {
  if(!elements[prop]) {
    elements[prop] = [];
  }
  return elements[prop];
}
export default {
  createTransitionForElement,
  createStylesForElement,
  createStylesElement,
};