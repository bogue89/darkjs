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
  'border-left-color': 'bl',
};
const propsExclusives = {
  'fill': ['svg', 'path', 'rect', 'clippath', 'circle', 'elipse', 'line', 'polygon'],
  'stroke': ['svg'],
};
const propsExcludes = {
  'border': {
    'test': '^0\D+|none', //regex match expresion
    'props': ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color']
  },
};
const propStyle   = "{selector} {\n\t{prop}: {color} !important;\n}\n";

function getPropsForElement(element) {  
  let filtered = Object.keys(props);
  const tagName = element.getTag();
  Object.keys(propsExcludes).forEach(prop => {
    const exclude = propsExcludes[prop];
    const style = element.getStyle(prop);
    const regex = new RegExp(exclude.test);
    if(regex.test(style)) {
      filtered = filtered.filter(p => exclude.props.indexOf(p) < 0);
    }
  });
  Object.keys(propsExclusives).forEach(prop => {
    const exclusive = propsExclusives[prop];
    if(exclusive.indexOf(tagName) < 0) {
      filtered = filtered.filter(p => p != prop);
    }
  });
  return filtered;
}
function createStylesForProps(map, background_props, darkThreshold, brightThreshold) {
  let styles = "";
  Object.keys(map.elements).forEach(prop => {
    const isApplicable = background_props.indexOf(prop)<0 ? Colors.isDark(map.color, darkThreshold):Colors.isBright(map.color, brightThreshold);
    if(!isApplicable) return;
    let selector = [];
    map.elements[prop].forEach( element => {
      selector.push(element.getPath());
    });
    styles += parse(propStyle, { 
      selector: selector.join(",\n"),
      prop: prop,
      color: map.inverted.toRgba()
    });
  })
  return styles;
}
function createStylesForColors(colors, className, background_props, darkThreshold, brightThreshold, animated) {
  const styles = create('style[class='+className+']');
  Object.keys(colors).forEach( rgba => {
    styles.addText(createStylesForProps(colors[rgba], background_props, darkThreshold, brightThreshold, animated))
  });
  return styles;
}
function createStylesForElement(colors, className, background_props, darkThreshold, brightThreshold, animated = true) {
  return createStylesForColors(colors, className, background_props, darkThreshold, brightThreshold, animated);
}
function createStylesFromText(text, className) {
  return create('style[class='+className+']').setText(text)
}
function getColorStyle(element, prop) {
  const string = element.getStyle(prop);
  if(/^rgb/.test(string)) {
    return string;
  }
  return false;
}
export default {
  createStylesFromText,
  createStylesForElement,
  getPropsForElement,
  getColorStyle
};