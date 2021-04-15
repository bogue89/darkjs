darkjs
-

A dark theme style conversion with js import using webpack as dev environment.

## Quick start

Looking to create a dark theme option for websites. This projects aims to offer a script you can just import on the `<head>` tag with no configuration.

### JS

The final script is not ready but im working on the implementation being something like:

    <head>
        ...
        <script src="//localhost:8080/darkjs.min.js"></script>
    </head>


## Installation

1. Clone the repo: `git clone https://github.com/bogue89/darkjs.git`
2. Install with [npm](https://www.npmjs.com/): `npm install`
3. Run `npm run dev`

Then visit `http://localhost:8080` to see the demo page.

## Status

![demo page](https://img.shields.io/static/v1?label=demo_page&message=completed&color=success)
![script](https://img.shields.io/static/v1?label=crawler&message=poc&color=yellow)
![script](https://img.shields.io/static/v1?label=styling&message=poc&color=yellow)
![dist build](https://img.shields.io/static/v1?label=dist&message=null&color=red)

### Working on

Demo Page
- Add nested support for elements 

Crawler
- I would like to only navigate the necessary elements and store that tree struc
- Adding support for images and svgs
- Adding support for color gradients on background

Styling
- Add offset or scale for better lightness distribution between elements (Contrast)
- Only adding the clases need it for that element
- Custom class for the implementation

Distribution
- Output the isolated js for the final implementation
