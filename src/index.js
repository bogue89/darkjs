
import './style.css';
import './utils/objects.extensions.js';

import _package from '../package.json';
import create from './utils/elements.js';
import parse from './utils/parse.js';
import home from './home/index.js';

function tweetIntent(url, text) {
  var href = "https://twitter.com/intent/tweet";
  const params = { text, url, via: 'bogue89'};
  return href+"?"+params.toQueryString();
}
function footer() {
  return create('footer.fixed-bottom.text-center')
    .insert(create('p')
      .setText('Make the world a little ')
      .insert(create('a.twitter-share-button[target=_blank][href='+tweetIntent(location.href, "Make the world a little darker")+']')
        .setHtml('darker <i class="fab fa-twitter"></i>')
      )
    );
}
function content() {
  return create('main.container')
    .insert(create('div.row')
      .insert(create('div.col-lg-3.col-md-5')
        .insert(home.greetings())
      )
      .insert(create('div.col-lg-8.offset-lg-1.col-md-7')
        .insert(home.card())
      )
    )
    .insert(create('h3.text-center').setText('But what if...'))
    .insert(home.whatifs());
}
document.body.appendChild(content());
document.body.appendChild(footer());

function importDarkjs() {
  const darklib = create(parse("script[src={url}{lib}?{query}]", {
    url: '.',
    lib: `/darkjs@${_package.version}.js`,
    query: {
      callback: 'darkcall',
    }.toQueryString()
  }));
  return darklib;
}
function darkcall() {
  let cards = document.querySelectorAll('.whatifs .card');
  cards.forEach((card, n) => {
    card.darkjs = new Darkjs(card, {
      cookieKey: false,
    });
  });
  //dark initialization
  document.body.darkjs = new Darkjs(document.body, {
    cookieKey: false,
  });
}
window.darkcall = darkcall;
document.head.append(importDarkjs());