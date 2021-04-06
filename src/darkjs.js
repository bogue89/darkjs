import create from './domelements.js';
import colorjs from './color.js';
import './darkjs.css';

function main(element) {  
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
  darkem(element, levels);
}
function darkem(element, levels) {
  const backgroundColor = colorjs(element.getStyle('background-color'));
  const color = colorjs(element.getStyle('color'));
  
  if(hasColor(backgroundColor) && !isDark(backgroundColor)) {
    const level = levels.bg[colorLevel(backgroundColor)];
    element
      .addClass('darkjs-bg')
      .addClass('darkjs-bg-'+level);
  }
  if(hasColor(color) && isDark(color)) {
    const level = levels.color[colorLevel(color)];
    element
    .addClass('darkjs-color')
    .addClass('darkjs-color-'+level);
  }
  const childs = element.children;
  for(var i=0; i<childs.length; i++) {
    darkem(childs[i], levels);
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
  console.log(color);
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
export default main;