class Color {
  constructor(string) {
    const hsla = this.hsla(string);
    this.hue = hsla.hue;
    this.saturation = hsla.saturation;
    this.lightness = hsla.lightness;
    this.alpha = hsla.alpha;
  }
}
/* to strings */
Color.prototype.toString = function() {
  return this.toRgba();
}
Color.prototype.toHexa = function() {
  const rgba = this.hslToRgb(this.hue%360, this.saturation, this.lightness);
  var a = this.valToHex(this.alpha * 255);
  return this.toHex() + a;
}
Color.prototype.toHex = function() {
  const rgba = this.hslToRgb(this.hue%360, this.saturation, this.lightness);
  var r = this.valToHex(rgba.red);
  var g = this.valToHex(rgba.green);
  var b = this.valToHex(rgba.blue);
  return "#" +  r + g + b;
}
Color.prototype.toRgba = function () {
  const rgb = this.hslToRgb(this.hue%360, this.saturation, this.lightness);
  return "rgba(" + Math.round(rgb.red) + ", " + Math.round(rgb.green) + ", " + Math.round(rgb.blue) + ", " + this.alpha + ")";
}
Color.prototype.toHsl = function () {
  return "hsl(" + (this.hue%360 || 0) + ", " + Math.round(this.sat * 100) + "%, " + Math.round(this.lightness * 100) + "%)";
}
/* conversions */
Color.prototype.valToHex = function(n) {
  var hex = parseInt(n).toString(16);
  while (hex.length < 2) {hex = "0" + hex; }
  return hex;
}
Color.prototype.hslToRgb = function(hue, sat, light) {
  var t1, t2, r, g, b;
  hue = hue / 60;
  if ( light <= 0.5 ) {
    t2 = light * (sat + 1);
  } else {
    t2 = light + sat - (light * sat);
  }
  t1 = light * 2 - t2;
  r = this.hueToRgb(t1, t2, hue + 2) * 255;
  g = this.hueToRgb(t1, t2, hue) * 255;
  b = this.hueToRgb(t1, t2, hue - 2) * 255;
  return {red : r, green : g, blue : b};
}
Color.prototype.hueToRgb = function (t1, t2, hue) {
  if (hue < 0) hue += 6;
  if (hue >= 6) hue -= 6;
  if (hue < 1) return (t2 - t1) * hue + t1;
  else if(hue < 3) return t2;
  else if(hue < 4) return (t2 - t1) * (4 - hue) + t1;
  else return t1;
}
/* from strings*/
Color.prototype.rgba = function(string) {
  var a = 1, rgb = string.replace(/[^\d\,\.]/g,'').split(',');
  rgb[0] = (parseInt(rgb[0]) || 0) / 255;
  rgb[1] = (parseInt(rgb[1]) || 0) / 255;
  rgb[2] = (parseInt(rgb[2]) || 0) / 255;
  if(typeof rgb[3] != 'undefined') {
    a = parseFloat(rgb[3]);
  }
  return {red : rgb[0], green : rgb[1], blue : rgb[2], alpha: a};
}
Color.prototype.hsla = function(string) {
  const rgba = this.rgba(string);
  var min, max, i, l, s, maxcolor, h, rgb = [];
  rgb[0] = rgba.red;
  rgb[1] = rgba.green;
  rgb[2] = rgba.blue;
  min = rgb[0];
  max = rgb[0];
  maxcolor = 0;
  for (i = 0; i < rgb.length - 1; i++) {
    if (rgb[i + 1] <= min) {min = rgb[i + 1];}
    if (rgb[i + 1] >= max) {max = rgb[i + 1];maxcolor = i + 1;}
  }
  if (maxcolor == 0) {
    h = (rgb[1] - rgb[2]) / (max - min);
  }
  if (maxcolor == 1) {
    h = 2 + (rgb[2] - rgb[0]) / (max - min);
  }
  if (maxcolor == 2) {
    h = 4 + (rgb[0] - rgb[1]) / (max - min);
  }
  if (isNaN(h)) {h = 0;}
  h = h * 60;
  if (h < 0) {h = h + 360; }
  l = (min + max) / 2;
  if (min == max) {
    s = 0;
  } else {
    if (l < 0.5) {
      s = (max - min) / (max + min);
    } else {
      s = (max - min) / (2 - max - min);
    }
  }
  s = s;
  return {hue : h, saturation : s, lightness : l, alpha: rgba.alpha};
}
export default function color(string) {
  return new Color(string);
}