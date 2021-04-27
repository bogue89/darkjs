import colorjs from '../utils/color.js';
import Styles from './darkjs.styles.js';

function getColorsInsideElement(element) {
  let colors = {};
  const strings = Styles.getStylesFromElement(element);
  strings.forEach(function(string) {
    if(/rgb/.test(string) && !colors[string]) {
      colors[string] = colorjs(string);
    }
  });
  const childs = element.children;
  for(var i=0; i<childs.length; i++) {
    colors = {...colors, ...getColorsInsideElement(childs[i])};
  }
  return colors;
}
function filterColorsWithThresholds(colors, darkThreshold, brightThreshold) {
  let filtered = {};
  Object.keys(colors).forEach((key) => {
    const color = colors[key];
    if(isBright(color, brightThreshold) || isDark(color, darkThreshold)) {
        filtered[key] = color;
    }
  });
  return filtered;
}
function colorsInElement(element, darkThreshold, brigthThreshold) {
  return filterColorsWithThresholds(
    getColorsInsideElement(element),
    darkThreshold,
    brigthThreshold
  );
}
function hasColor(color) {
  return color.alpha > 0;
}
function isDark(color, threshold) {
  return hasColor(color) && color.lightness < threshold;
}
function isBright(color, threshold) {
  return hasColor(color) && color.lightness > threshold;
}
function invertBrightness(color, offset = 0) {
  color.lightness = 1+(offset/100)-color.lightness;
  if(color.lightness > 1) {
    color.lightness = 1;
  }
  return color;
}
export default {colorsInElement, invertBrightness, isDark, isBright};