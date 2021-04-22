import parse from '../utils/parse.js';
import create from '../utils/elements.js';
import colorjs from '../utils/color.js';
import Darkjs from '../darkjs.js';
import bat from '../assets/bat.svg';
import './whatifs.css';

function card(title, example, finished) {
  return create('div.card')
    .insert(create('div.card-body')
      .insert(create('h3')
        .setText(title)
      )
      .insert(create('div')
        .insert(example)
      )
    )
    .insert(create('div.card-footer')
      .insert(create('button[type=button].btn.btn-warning.w-100')
        .setHtml('<i class="fas fa-'+(finished ? "check text-success":"times text-danger")+'"></i> Test')
        .on('click', function() {
          if(!this.darkjs) {
            this.darkjs = new Darkjs(this.parentNode.parentNode, {
              className: "dk",
              offset:0
            });
          }
          this.darkjs.toggle();
        })
      )
    );
}
function opacity() {
  return create('div')
    .insert(create('p')
      .setHtml('Same color, different opacities.')
    )
    .insert(create('div.position-relative')
      .insert(create('div')
        .setStyle('height: 120px; width: 140px; border-radius: .5rem; position: absolute; top: 0;')
        .addStyle('background', 'rgba(0,0,0,0.4)')
      )
      .insert(create('div')
        .setStyle('height: 120px; width: 140px; border-radius: .5rem; position: absolute; top: 20px;')
        .addStyle('background', '#000')
        .addStyle('opacity', 0.4)
        .addStyle('margin', '0 0 0 auto')
        .addStyle('right', '30px')
      )
      .insert(create('div')
        .setStyle('height: 120px; width: 140px; border-radius: .5rem; position: absolute; top: 0;')
        .addStyle('background', 'rgba(0,0,0,0.4)')
        .addStyle('opacity', 0.4)
        .addStyle('margin', '80px 0 0 60px')
        .addStyle('left:60px')
      )
    );
}
function blackLogo() {
  var size = 100;
  return create('div')
    .insert(create('p')
      .setHtml('On img and svg elements')
    )
    .insert(create('div.d-flex')
      .insert(create(parse('img[src={url}][width=30%]', { url: bat}))
        .on('load', function() {
          fetch(this.src).then((resp) => resp.text()).then(function(data) {
            this.after(create('div').setHtml(data));
          }.bind(this));
        })
      )
      .insert(create('div')
        .setStyle(parse('background: transparent url({url}) center center repeat-x; background-size:contain; width: {size}px; height: {size}px;', {
          url: bat,
          size: size
        }))
      )
    );
}
function colorBrightness() {
  var color1, color2;
  const color = colorjs([120, 80, 270].join(','));
  color.lightness = 0.8;
  color1 = color.toRgba();
  color.hue += 150;
  color2 = color.toRgba();
  return create('div')
    .insert(create('p')
      .setHtml('Colors with same brigtness level')
    )
    .insert(create('div.d-flex.align-items-center')
      .insert(create('div')
        .setStyle('width:50%; height: 80px;')
        .addStyle('background-color', color1)
      )
      .insert(create('div')
        .setStyle('width:50%; height: 80px;')
        .addStyle('background-color', color2)
      )
    );
}
const cases = [
  card('Opacity', opacity()),
  card('Black logos', blackLogo()),
  card('Equal bright', colorBrightness(), true),
];
function whatifs() {
  const element = create('div.row');
  cases.forEach((e) => {
    element.insert(create('div.col-sm-6.col-md-4').insert(e));
  });
  return create('div.whatifs').insert(element);
}
export default whatifs;