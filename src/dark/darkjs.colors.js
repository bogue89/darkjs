import colorjs from '../utils/color.js';

function create(rgbaString) {
  return colorjs(rgbaString);
}
function hasColor(color) {
  return color.alpha > 0;
}
function isDark(color, threshold) {
  return hasColor(color) && color.lightness < (threshold/100);
}
function isBright(color, threshold) {
  return hasColor(color) && color.lightness > (threshold/100);
}
function invertBrightness(color, offset = 0) {
  color.lightness = 1+(offset/100)-color.lightness;
  if(color.lightness > 1) {
    color.lightness = 1;
  }
  return color;
}
export default {create, invertBrightness, isDark, isBright};