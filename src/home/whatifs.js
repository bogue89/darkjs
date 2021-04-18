import create from '../utils/elements.js';
import colorjs from '../utils/color.js';
import Darkjs from '../darkjs.js';
import './whatifs.css';

function card(title, example) {
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
        .setText('Test')
        .on('click', function() {
          if(!this.darkjs) {
            this.darkjs = new Darkjs(this.parentNode.parentNode, {
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
  return create('div')
    .insert(create('p')
      .setHtml('On img and svg elements')
    )
    .insert(create('div.text-center')
      .setHtml('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>')
    );
}
function colorBrightness() {
  var color1, color2;
  const color = colorjs([Math.random() * 255, Math.random() * 255, Math.random() * 255].join(','));
  color.lightness = 0.8;
  color1 = color.toRgba();
  color.hue += 150;
  color2 = color.toRgba();

  return create('div')
    .insert(create('p')
      .setHtml('Colors with same brigtness level')
    )
    .insert(create('div.d-flex')
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
  card('Equal bright', colorBrightness()),
];
function whatifs() {
  const element = create('div.row');
  cases.forEach((e) => {
    element.insert(create('div.col-sm-6.col-md-4').insert(e));
  });
  return create('div.whatifs').insert(element);
}
export default whatifs;