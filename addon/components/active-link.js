import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  childLinkViews: [],
  classNameBindings: ['active'],

  enabled: 'active',
  disabled: '',

  active: Ember.computed('childLinkViews.@each.active', function() {
    return Ember.A(this.get('childLinkViews')).isAny('active') ? this.get('enabled') : this.get('disabled');
  }),

  didRender: function() {
    Ember.run.schedule('afterRender', this, function() {
      var childLinkElements = this.$('a.ember-view');

      var childLinkViews = childLinkElements.toArray().map(view =>
        this._viewRegistry[view.id]
      );

      this.set('childLinkViews', childLinkViews);
    });
  }

});
