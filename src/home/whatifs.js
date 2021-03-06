import './whatifs.css';

import parse from '../utils/parse.js';
import create from '../utils/elements.js';
import colorjs from '../utils/color.js';
import bat from '../assets/bat.svg';

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
      .insert(create('button[type=button].btn.btn-warning')
        .setHtml('<i class="fas fa-'+(finished ? "check text-success":"times text-danger")+'"></i> Test')
        .on('click', function() {
          if(typeof Darkjs == 'undefined') {
            alert('you need to import the lib');
            return;
          }
          const card = this.parentNode.parentNode;
          if(card.darkjs) {
            card.darkjs.toggle();
          }
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
  const svgCard = create('div');
  fetch(bat)
    .then((resp) => resp.text())
    .then((data) => {
      svgCard.setHtml(data);
  });
  return create('div')
    .insert(create('p')
      .setHtml('On img and svg elements')
    )
    .insert(create('div.d-flex')
      .insert(create(parse('img[src={url}][width=30%]', { url: bat})))
      .insert(svgCard)
      .insert(create('div')
        .setStyle('background: transparent url('+bat+') center center repeat-x; background-size:contain; width: 30%; height: 100px;')
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
function gradientBg() {
  return create('div')
    .insert(create('p')
      .setHtml('Color gradients as backgrounds')
    )
    .insert(create('div')
      .addStyle('background', 'linear-gradient(-90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)')
      .addStyle('height', '120px')
    );
}
function reactiveDOM() {
  let n = 1;
  const list = create('div.list.d-flex.justify-content-around');
  setInterval(() => {
    if(n > 9) { n = 1 }
    list.insert(create('p').setHtml(n++))
    const items = list.querySelectorAll('*');
    if(items.length > 4) { items[0].remove() }
  }, 1000);
  return create('div')
    .insert(create('p')
      .setHtml('Changing DOM elements')
    )
    .insert(list);
}
const cases = [
  card('Reactive', reactiveDOM(), true),
  card('Black logos', blackLogo()),
  card('Equal bright', colorBrightness(), true),
  card('Gradients', gradientBg()),
  card('Opacity', opacity()),
];
function whatifs() {
  const element = create('div.row');
  cases.forEach((e) => {
    element.insert(create('div.col-sm-6.col-md-4').insert(e));
  });
  return create('div.whatifs').insert(element);
}
export default whatifs;