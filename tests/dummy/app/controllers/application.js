import Ember from 'ember';

export default Ember.Controller.extend({
    dynamicLinks: Ember.A([
        {
            route: "other",
            label: "Other"
        }
    ]),

    actions: {
        removeLink(link) {
            this.get('dynamicLinks').removeObject(link);
        },

        noop: Ember.K
    }
});
