import Ember from 'ember';

// these are not currently editable in Ember
const transitioningInClass  = 'ember-transitioning-in';
const transitioningOutClass = 'ember-transitioning-out';

export default Ember.Mixin.create({

  classNameBindings: ['_active','_disabled','_transitioningIn','_transitioningOut'],
  linkSelector: 'a.ember-view',

  init() {
    this._super(...arguments);

    this.set('childLinkViews',  Ember.A([]));
  },

  buildChildLinkViews: Ember.on('didInsertElement', function(){
    Ember.run.scheduleOnce('afterRender', this, function(){
      let childLinkSelector = this.get('linkSelector');
      let childLinkElements = this.element.querySelectorAll(childLinkSelector);
      let viewRegistry = Ember.getOwner(this).lookup('-view-registry:main');

      let childLinkViews = Array.prototype.map.call(childLinkElements,
        view => viewRegistry[view.id]
      );

      this.set('childLinkViews', Ember.A(childLinkViews));
    });
  }),

  _transitioningIn: Ember.computed('childLinkViews.@each.transitioningIn', function(){
    if (this.get('childLinkViews').isAny('transitioningIn')) {
      return transitioningInClass;
    }
  }),

  _transitioningOut: Ember.computed('childLinkViews.@each.transitioningOut', function(){
    if (this.get('childLinkViews').isAny('transitioningOut')) {
      return transitioningOutClass;
    }
  }),

  hasActiveLinks: Ember.computed('childLinkViews.@each.active', function(){
    return this.get('childLinkViews').isAny('active');
  }),

  activeClass: Ember.computed('childLinkViews.@each.active', function(){
    let activeLink = this.get('childLinkViews').findBy('active');
    return (activeLink ? activeLink.get('active') : 'active');
  }),

  _active: Ember.computed('hasActiveLinks', 'activeClass', function(){
    return (this.get('hasActiveLinks') ? this.get('activeClass') : false);
  }),

  allLinksDisabled: Ember.computed('childLinkViews.@each.disabled', function(){
    return !Ember.isEmpty(this.get('childLinkViews')) && this.get('childLinkViews').isEvery('disabled');
  }),

  disabledClass: Ember.computed('childLinkViews.@each.disabled', function(){
    let disabledLink = this.get('childLinkViews').findBy('disabled');
    return (disabledLink ? disabledLink.get('disabled') : 'disabled');
  }),

  _disabled: Ember.computed('allLinksDisabled', 'disabledClass', function(){
    return (this.get('disabled') || this.get('allLinksDisabled') ? this.get('disabledClass') : false);
  })

});
