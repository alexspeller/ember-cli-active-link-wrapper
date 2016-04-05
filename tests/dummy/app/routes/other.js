import Ember from 'ember';

export default Ember.Route.extend({

  // add a very slight delay so that we can test the
  // transitioningIn/Out classes.
  model() {
    return new Ember.RSVP.Promise((resolve) => {
      Ember.run.later(() => {
        resolve();
      }, 10);
    });
  }

});
