import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  disabled: false,
  classNameBindings: ['active', 'disabled'],
  active: function() {

    var disabled = this.get('disabled');

    if (disabled) {
      return false;
    }

    return this.get('childViews').anyBy('active');
  }.property('childViews.@each.active', 'disabled')
});
