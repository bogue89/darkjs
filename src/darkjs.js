import create from './domelements.js';
import colorjs from './color.js';
import './darkjs.css';

function darkem(element) {  
  var levels = { 'bg': {}, 'color': {}};
  var n;
  n = 1;
  (new Set(bgLevels(element).sort((a,b) => b - a))).forEach((level) => {
    levels['bg'][level] = n;
    n += 1;
  });
  n = 1;
  (new Set(colorLevels(element).sort((a,b) => a - b))).forEach((level) => {
    levels['color'][level] = n;
    n += 1;
  });
  darkemWithLevels(element, levels);
}
function darkemWithLevels(element, levels) {
  const backgroundColor = colorjs(element.getStyle('background-color'));
  const color = colorjs(element.getStyle('color'));
  
  if(hasColor(backgroundColor) && !isDark(backgroundColor)) {
    const level = levels.bg[colorLevel(backgroundColor)];
    element
      .addClass('darkjs')
      .addClass('darkjs-bg-'+level);
  }
  if(hasColor(color) && isDark(color)) {
    const level = levels.color[colorLevel(color)];
    element
    .addClass('darkjs')
    .addClass('darkjs-color-'+level);
  }
  const childs = element.children;
  for(var i=0; i<childs.length; i++) {
    darkemWithLevels(childs[i], levels);
  }
}
function darkemnt(element) {
  const clss = element.className.match(/darkjs-[\w\-]+/g) || [];
  for(var c=0; c<clss.length; c++) {
    element.removeClass(clss[c]);
  }
  const childs = element.querySelectorAll ('[class*=darkjs-]') || [];
  for(var i=0; i<childs.length; i++) {
    darkemnt(childs[i]);
  }
}
function bgLevels(element) {
  var levels = [];
  const color = colorjs(element.getStyle('background-color'));
  if(hasColor(color) && !isDark(color)) {
    levels.push(colorLevel(color));
  }
  const childs = element.children;
  for(var i=0; i<childs.length; i++) {
    levels = levels.concat(bgLevels(childs[i]));
  }
  return levels;
}
function colorLevels(element) {
  var levels = [];
  const color = colorjs(element.getStyle('color'));
  if(hasColor(color) && isDark(color)) {
    levels.push(colorLevel(color));
  }
  const childs = element.children;
  for(var i=0; i<childs.length; i++) {
    levels = levels.concat(colorLevels(childs[i]));
  }
  return levels;
}
function colorLevel(color) {
  return Math.round(color.lightness * 100) || 0;
}
function hasColor(color) {
  return color.alpha > 0;
}
function isDark(color) {
  return color.alpha > 0.3 && color.lightness < 0.7;
}
export default {darkem, darkemnt};