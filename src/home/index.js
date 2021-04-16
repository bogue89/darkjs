import create from '../utils/elements.js';
import links from '../refs/links.json';
import Darkjs from '../darkjs.js';

import previews from './code_previews.js';

function greetings() {
  return create('div.greetings')
    .insert(create('h1')
      .setText('Dark.js')
    ).insert(create('p.lead')
      .setText("Allow your users to navigate on a dark themed version of your website.")
    ).insert(create('a.btn.btn-primary[href='+links.github+'][target=_blank]')
      .setHtml('Download on Github <i class="fab fa-github"></i>')
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
export default {greetings, card};