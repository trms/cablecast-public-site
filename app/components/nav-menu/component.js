import { computed } from '@ember/object';
import Component from '@ember/component';
import ENV from 'cablecast-public-site/config/environment';

export default Component.extend({
	tagName: 'nav',
	classNames: ['main-nav-menu'],
  rootURL: computed(function() {
    return ENV.rootURL;
  }),
	actions: {
		search: function(query) {
			this.onSearch(query);
		},
		watch: function(stream_id){
			this.onSearch(stream_id);
		},
	}
});