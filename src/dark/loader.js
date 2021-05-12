import _package from '../../package.json';

const s = document.querySelector('script[src*="darkjs.js"]');
const d = document.createElement('script');
d.src = s.src.replace('.js', `@${_package.version}.js`);
document.head.insertBefore(d, s);