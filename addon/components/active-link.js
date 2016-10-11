import Ember from 'ember';
import ActiveLinkContainer from './active-link-container';

export default Ember.LinkComponent.extend({
    init() {
        this._super(...arguments);
        Ember.run.scheduleOnce('afterRender', this, 'registerWithParents');
    },

    registerWithParents() {
        let parent = this.get('parentView');

        //traverse up the view tree and add the link as a child
        //of any ancestor active-link-container components that are found
        //(for cases where the link is not a direct descendant, or there
        //multiple active-link-container ancestors, such as in a submenu)
        while(parent) {
            if(parent instanceof ActiveLinkContainer) {
                parent.registerChild(this);
            }

            parent = parent.get('parentView');
        }
    }
});
