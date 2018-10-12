import Component from '@ember/component';
import ActiveLinkMixin from '../mixins/active-link';

export default Component.extend(ActiveLinkMixin, {
  tagName: 'li'
});
