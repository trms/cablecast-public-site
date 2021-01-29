import { computed } from '@ember/object';
import Component from '@ember/component';
import ENV from 'public/config/environment';

export default Component.extend({
	tagName: 'nav',
	classNames: ['main-nav-menu'],
  rootURL: computed(function() {
    return ENV.rootURL;
  }),
	actions: {
		search: function(query) {
			this.sendAction('on-search', query);
		},
		watch: function(stream_id){
			this.sendAction('on-watch', stream_id);
		},
	}
});