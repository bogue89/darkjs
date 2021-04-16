import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import 'highlight.js/styles/railscasts.css';

import parse from '../utils/parse.js';
import links from '../refs/links.json';

const import_preview_url = links.localhost+"/npm/darkjs@1.0.0/dist/darkjs.min.js";
const import_preview_params = "?callback=darkCallback";
const import_preview_callback = "\n\t<script>\n\t\tdarkCallback = function() {\n\t\t\tdarkem(document.body);\n\t\t}\n\t</script>";
const import_preview_body = "<head>\n\t...{callback}\n\t<script src=\"{url}{params}\"></script>\n</head>";

function code() {
  const element = document.createElement('pre');
  element.className = "preview";
  return element;
}
function sync() {
  const element = code();
  element.setHtml(
    hljs.highlightAuto(
      parse(import_preview_body, {
        url: import_preview_url
      })
    ).value
  );
  return element;
}
function async() {
  const element = code();
  element.setHtml(
    hljs.highlightAuto(
      parse(import_preview_body, {
        url: import_preview_url,
        params: import_preview_params,
        callback: import_preview_callback
      })
    ).value
  );
  return element;
}

export default {sync, async};