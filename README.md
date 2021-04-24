darkjs
-

A dark theme style conversion with js import using webpack as dev environment.

## Quick start

Looking to create a dark theme option for websites. This projects aims to offer a script you can just import on the `<head>` tag with no configuration.

### JS

You can import the .js file on your `<head>` with no configuration and it will apply to body

    <head>
        ...
        <script src="//localhost:8080/darkjs.js"></script>
    </head>

Or you can pass configuration options in the url, or just specify a callback function

    <head>
        ...
        <script src="//localhost:8080/darkjs.js?callback=customCallbackForCustomConfig"></script>
    </head>


## Installation

1. Clone the repo: `git clone https://github.com/bogue89/darkjs.git`
2. Install with [npm](https://www.npmjs.com/): `npm install`
3. Run `npm run dev`

Then visit `http://localhost:8080` to see the demo page.

## Status

![demo page](https://img.shields.io/static/v1?label=demo_page&message=completed&color=success)
![script](https://img.shields.io/static/v1?label=crawler&message=progress&color=success)
![script](https://img.shields.io/static/v1?label=styling&message=progress&color=success)
![dist build](https://img.shields.io/static/v1?label=dist&message=poc&color=red)

### Working on

Lib
- Add support for configuration options in the import url

Demo Page
- Add nested support for elements
- Store preference

Crawler
- I would like to only navigate the necessary elements and store that tree struct
- Adding support for images and ~~svgs~~
- Adding support for color gradients on background

Distribution
- Output the isolated js for the final implementation
- Create a second output with minified version of js