import Ember from 'ember';
import ActiveLinkContainerMixin from '../mixins/active-link-container';

export default Ember.Component.extend(ActiveLinkContainerMixin, {
    tagName: 'li'
});
