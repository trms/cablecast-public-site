import Ember from 'ember';
import ENV from 'public/config/environment';

export default Ember.Component.extend({
  classNames: ['show-stub'],
  rootURL: Ember.computed(function() {
    return ENV.rootURL;
  })
});
