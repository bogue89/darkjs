class Color {
  constructor(string) {
    const hsla = this.hsla(string);
    this.hue = hsla.hue;
    this.saturation = hsla.saturation;
    this.lightness = hsla.lightness;
    this.alpha = hsla.alpha;
  }
}

Color.prototype.toHsl = function () {
  return "hsl(" + (this.hue || 0) + ", " + Math.round(this.sat * 100) + "%, " + Math.round(this.lightness * 100) + "%)";
}
Color.prototype.hsla = function(string) {
  var min, max, i, l, s, maxcolor, h, a = 1, rgb = string.replace(/[^\d,]/g,'').split(',');
  rgb[0] = (parseInt(rgb[0]) || 0) / 255;
  rgb[1] = (parseInt(rgb[1]) || 0) / 255;
  rgb[2] = (parseInt(rgb[2]) || 0) / 255;
  if(typeof rgb[3] != 'undefined') {
    a = parseFloat(rgb[3]);
  }
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
  return {hue : h, saturation : s, lightness : l, alpha: a};
}

function color(string) {
  return new Color(string);
}
export default color;