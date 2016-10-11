import Ember from 'ember';
import ActiveLinkContainer from './active-link-container';

export default Ember.LinkComponent.extend({
    init() {
        this._super(...arguments);
        this.set('parentContainers', Ember.A([]));
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
                this.get('parentContainers').pushObject(parent);
            }

            parent = parent.get('parentView');
        }
    },

    deregisterFromParents() {
        this.get('parentContainers').invoke('deregisterChild', this);
    },

    onWillDestroyElement: Ember.on('willDestroyElement', function() {
        Ember.run.scheduleOnce('afterRender', this, 'deregisterFromParents');
    })
});
