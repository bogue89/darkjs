import _package from '../../package.json';
import parse from '../utils/parse.js';
import create from '../utils/elements.js';

function importDarkjs() {
  let src;
  document.querySelectorAll('script').forEach(script => {
    if(/\/darkjs.js/.test(script.src)) {
      src = script.src;
    }
  });
  if(!src) return '';
  const darklib = create(parse("script[src={src}]", {
    src: src.replace('.js', `@${_package.version}.js`)
  }));
  return darklib;
}
document.head.append(importDarkjs());