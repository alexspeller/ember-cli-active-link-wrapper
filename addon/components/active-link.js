import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['active'],

  active: Ember.computed('childLinkViews.@each.active', function() {
    return this.get('childLinkViews').isAny('active');
  }),

  init() {
    this._super( ...arguments );
    this.set('childLinkViews', Ember.A());
  },

  didRender() {
    this._super( ...arguments );
    Ember.run.schedule('afterRender', this, function() {
      let childLinkElements = this.$('a.ember-view');

      let childLinkViews = childLinkElements.toArray().map(view =>
        this._viewRegistry[view.id]
      );

      this.set('childLinkViews', Ember.A(childLinkViews));
    });
  }

});
