import './style.css';

import create from './elements.js';
import Darkjs from './darkjs.js';
import previews from './code_previews';
import links from './links.json';

function footer() {
  return create('footer.fixed-bottom.text-center')
    .insert(create('p')
      .setText('Make the world a little ')
      .insert(create('a[href=#tweetit]')
        .setHtml('darker <i class="fab fa-twitter">Tweet it</i>')
      )
    );
}
function greeting() {
  return create('div.greetings')
    .insert(create('h1')
      .setText('Dark.js')
    ).insert(create('p.lead')
      .setText("Allow your users to navigate on a dark themed version of your website.")
    ).insert(create('a.btn.btn-primary[href='+links.github+'][target=_blank]')
      .setHtml('<i class="fab fa-githun"></i> Download on Github')
    );
}
function card() {
  return create('div.card-preview')
    .insert(create('h2')
      .setText("How to use")
    ).insert(create('p')
      .setText("You can import the .js file on your <head> with no configuration and it will apply to body")
    ).insert(previews.sync())
    .insert(create('p')
      .setText("... or you can manually target elements")
    ).insert(previews.async())
    .insert(create('div.text-center')
      .insert(create('button.btn.btn-info[type=button]')
        .setText("Demo")
        .on('click', (e) => {
          if(!window.darkjs) {
            window.darkjs = new Darkjs(document.querySelector('body'));
          }
          window.darkjs.toggle();
          e.srcElement.setText(window.darkjs.isDark ? 'Undo':'Demo');
        })
      )
    );    
}
function content() {

  return create('main.container')
    .insert(create('div.row')
      .insert(create('div.col-lg-5')
        .insert(greeting())
      )
      .insert(create('div.col-lg-7')
        .insert(card())
      )
    );
}
document.body.appendChild(content());
document.body.appendChild(footer());