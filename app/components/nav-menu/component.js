import Ember from 'ember';
import ENV from 'public/config/environment';

export default Ember.Component.extend({
	tagName: 'nav',
	classNames: ['main-nav-menu'],
  rootURL: Ember.computed(function() {
    return ENV.rootURL;
  }),
	actions: {
		search: function(query) {
			this.sendAction('on-search', query);
		},
		watch: function(stream_id){
			this.sendAction('on-watch', stream_id);
		}
	}
});