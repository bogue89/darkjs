import parse from './parse.js';

const import_preview_url = "cdn.localhost:8080/npm/darkjs@1.0.0/dist/darkjs.min.js";
const import_preview_params = "?callback=darkCallback";
const import_preview_callback = "\n\t<script>\n\t\tdarkCallback = function() {\n\t\t\tdarkem(document.body);\n\t\t}\n\t</script>";
const import_preview_body = "<head>\n\t...{callback}\n\t<script src=\"//{url}{params}\"></script>\n</head>";

function code() {
  const element = document.createElement('pre');
  element.className = "preview";
  return element;
}
function sync() {
  const element = code();
  element.innerText = parse(import_preview_body, {
    url: import_preview_url
  });
  return element;
}
function async() {
  const element = code();
  element.innerText = parse(import_preview_body, {
    url: import_preview_url,
    params: import_preview_params,
    callback: import_preview_callback
  });
  return element;
}

export default {sync, async};