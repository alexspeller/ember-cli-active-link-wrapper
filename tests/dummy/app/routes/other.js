import Route from '@ember/routing/route';
import { Promise } from 'rsvp';
import { later } from '@ember/runloop';


export default Route.extend({

  // add a very slight delay so that we can test the
  // transitioningIn/Out classes.
  model() {
    return new Promise((resolve) => {
      later(() => {
        resolve();
      }, 100);
    });
  }

});
