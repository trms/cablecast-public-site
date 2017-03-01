import Ember from 'ember';
import ENV from 'public/config/environment';

export default Ember.Component.extend({
  rootURL: Ember.computed(function() {
    return ENV.rootURL;
  }),
	channelContactInfo: null
});