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
      .insert(create('div.col-lg-5')
        .insert(home.greetings())
      )
      .insert(create('div.col-lg-7')
        .insert(home.card())
      )
    );
}
document.body.appendChild(content());
document.body.appendChild(footer());