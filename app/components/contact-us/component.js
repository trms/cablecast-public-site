import { computed } from '@ember/object';
import Component from '@ember/component';
import ENV from 'public/config/environment';

export default Component.extend({
  rootURL: computed(function() {
    return ENV.rootURL;
  }),
	channelContactInfo: null
});