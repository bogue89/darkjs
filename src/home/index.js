import create from '../utils/elements.js';
import links from '../refs/links.json';
import previews from './code_previews.js';
import whatifs from './whatifs.js';

function greetings() {
  return create('div.greetings')
    .insert(create('h1')
      .setText('Dark.js')
    ).insert(create('p.lead')
      .setText("Allow your users to navigate on a dark themed version of your website.")
    ).insert(create('a.btn.btn-primary.w-100[href='+links.github+'][target=_blank]')
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
          if(typeof Darkjs == 'undefined') {
            alert('you need to import the lib');
            return;
          }
          if(!document.body.darkjs) {
            document.body.darkjs = new Darkjs(document.body);
          }
          document.body.darkjs.toggle();
          e.srcElement.setText(document.body.darkjs.isDark ? 'Undo':'Demo');
        })
      )
    );    
}
export default {greetings, card, whatifs};