import './style.css';

import create from './utils/elements.js';
import home from './home/index.js';

function footer() {
  return create('footer.fixed-bottom.text-center')
    .insert(create('p')
      .setText('Make the world a little ')
      .insert(create('a[href=#tweetit]')
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