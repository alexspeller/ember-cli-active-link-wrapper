import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';
import { on } from '@ember/object/evented';
import { scheduleOnce } from '@ember/runloop';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

// these are not currently editable in Ember
const transitioningInClass  = 'ember-transitioning-in';
const transitioningOutClass = 'ember-transitioning-out';

export default Mixin.create({

  classNameBindings: ['_active','_disabled','_transitioningIn','_transitioningOut'],
  linkSelector: 'a.ember-view',

  init() {
    this._super(...arguments);

    this.set('childLinkViews',  A([]));
  },

  buildChildLinkViews: on('didInsertElement', function(){
    scheduleOnce('afterRender', this, function(){
      let childLinkSelector = this.get('linkSelector');
      let childLinkElements = this.element.querySelectorAll(childLinkSelector);
      let viewRegistry = getOwner(this).lookup('-view-registry:main');

      let childLinkViews = Array.prototype.map.call(childLinkElements,
        view => viewRegistry[view.id]
      );

      this.set('childLinkViews', A(childLinkViews));
    });
  }),

  _transitioningIn: computed('childLinkViews.@each.transitioningIn', function(){
    if (this.get('childLinkViews').isAny('transitioningIn')) {
      return transitioningInClass;
    }
  }),

  _transitioningOut: computed('childLinkViews.@each.transitioningOut', function(){
    if (this.get('childLinkViews').isAny('transitioningOut')) {
      return transitioningOutClass;
    }
  }),

  hasActiveLinks: computed('childLinkViews.@each.active', function(){
    return this.get('childLinkViews').isAny('active');
  }),

  activeClass: computed('childLinkViews.@each.active', function(){
    let activeLink = this.get('childLinkViews').findBy('active');
    return (activeLink ? activeLink.get('active') : 'active');
  }),

  _active: computed('hasActiveLinks', 'activeClass', function(){
    return (this.get('hasActiveLinks') ? this.get('activeClass') : false);
  }),

  allLinksDisabled: computed('childLinkViews.@each.disabled', function(){
    return !isEmpty(this.get('childLinkViews')) && this.get('childLinkViews').isEvery('disabled');
  }),

  disabledClass: computed('childLinkViews.@each.disabled', function(){
    let disabledLink = this.get('childLinkViews').findBy('disabled');
    return (disabledLink ? disabledLink.get('disabled') : 'disabled');
  }),

  _disabled: computed('allLinksDisabled', 'disabledClass', function(){
    return (this.get('allLinksDisabled') ? this.get('disabledClass') : false);
  })

});
