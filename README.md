Darkjs
-

An auto-generated darktheme styling with js import using webpack as dev enviroment.

## Quick start

[Demo](https://darkjs.pewpew.mx/) page shows you how to create a dark theme for your website. This project generates a script you can just import in the `<head>` tag with optional configuration.

### JS

Import the .js file on your `<head>` with no configuration and it will apply to the body.
```html
<head>
    ...
    <script src="https://darkjs.pewpew.mx/darkjs.js"></script>
</head>
```

You can pass configuration options in the url, or just specify a callback function for later initialization.
```html
<head>
    ...
    <script src="https://darkjs.pewpew.mx/darkjs.js?callback=myCallback"></script>
</head>
```

## Installation

1. Clone this repo: `git clone https://github.com/bogue89/darkjs.git`
2. Install with [npm](https://www.npmjs.com/): `npm install`
3. Run `npm run dev`

Then visit `http://localhost:8080` to see the [demo](https://darkjs.pewpew.mx/) page.

### Config Options
You can pass a query string for configuration options in import url `GET` 

`https://darkjs.pewpew.mx/darkjs.js?mode=custom&offset=0`

Allowed values are as follows:

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`mode`**|`{String}`|`device`|Indicates whether to be always `on \| off`, `custom` state stored on cookie, or `device` for inherit browser appeareance|
|**`animate`**|`{Boolean}`|`true`|Adds transition style to root element|
|**`offset`**|`{Number}`|`10`|Percentage off brightness offset when inverting colors|
|**`className`**|`{String}`|`darkjs`|Class added to the root element|
|**`storeKey`**|`{String}`|`darkjs`|Name use for the cookie and localStorage|
|**`darkThreshold`**|`{Number}`|`darkjs`|Percentage of lightness low enough|
|**`brightThreshold`**|`{Number}`|`darkjs`|Percentage of lightness high enough|
|**`background_props`**|`{Array.<string>}`|`['background-color']`|Background properties for elements (you may add fill for some svg uses)|
|**`exclude_elements`**|`{Array.<string>}`|`['style', 'script', 'img', 'text', 'video', 'audio']`|Crawler will ignore this elements on styling, but they may still inherit properties|
|***`callback`***|`{String}`|`null`|Name of the callback function when library is loaded passing the reference and imported options `(darkjs, options) => new darkjs(dom.element, options)`|

Here's an example of config for an site to be always on darkmode, with no transition, inverted from white to black.

```js
new Darkjs(document.body, {
  mode: 'on',
  animate: false,
  offset: 0
});
```

## Status

![demo page](https://img.shields.io/static/v1?label=demo_page&message=completed&color=success)
![script](https://img.shields.io/static/v1?label=crawler&message=completed&color=success)
![script](https://img.shields.io/static/v1?label=styling&message=completed&color=success)
![dist build](https://img.shields.io/static/v1?label=dist&message=completed&color=success)

### Working on

Lib
- Adding support for img elements
- Adding support for background with gradients
- Objects using background and fill property as content

Demo Page
- Cooler looks
