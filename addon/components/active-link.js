import Ember from 'ember';
import ActiveLinkMixin from '../mixins/active-link';

export default Ember.Component.extend(ActiveLinkMixin, {
  tagName: 'li'
});
