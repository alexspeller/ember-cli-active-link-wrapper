import Ember from 'ember';

export default Ember.Mixin.create({

  classNameBindings: ['_active','_disabled'],
  linkSelector: 'a.ember-view',

  initChildLinkViews: Ember.on('init', function(){
    this.set('childLinkViews', Ember.A());
  }),

  buildChildLinkViews: Ember.on('didRender', function(){
    Ember.run.schedule('afterRender', this, function(){
      let childLinkSelector = this.get('linkSelector');
      let childLinkElements = this.$(childLinkSelector);

      let childLinkViews = childLinkElements.toArray().map(view =>
        this._viewRegistry[view.id]
      );

      this.set('childLinkViews', Ember.A(childLinkViews));
    });
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
    return this.get('childLinkViews').isEvery('disabled');
  }),

  disabledClass: Ember.computed('childLinkViews.@each.disabled', function(){
    let disabledLink = this.get('childLinkViews').findBy('disabled');
    return (disabledLink ? disabledLink.get('disabled') : 'disabled');
  }),

  _disabled: Ember.computed('allLinksDisabled', 'disabledClass', function(){
    return (this.get('allLinksDisabled') ? this.get('disabledClass') : false);
  })

});
