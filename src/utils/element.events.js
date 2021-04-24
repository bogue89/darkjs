const observerConfig = { attributes: true, childList: true, subtree: true };

const customEvents = {
    load: function(callback) {
        if(this.getTag()=='img') return;
        window.addEventListener('load', callback.bind(this), false);
    },
    modified: function(callback) {
        //wrapped callout to prevent loop
        let timeout, wrapper = function() {
            if(timeout) return;
            setTimeout(callback.bind(this), 1);
            timeout = setTimeout(() => { timeout = null}, 1);
        }.bind(this);
        if(typeof MutationObserver != 'undefined') {
            const observer = new MutationObserver(wrapper);
            observer.observe(this, observerConfig);
        } else {
            this.addEventListener('DOMSubtreeModified', wrapper, false);
        }
    }
};

export default customEvents;