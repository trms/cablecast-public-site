import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'nav',
	classNames: ['main-nav-menu'],
	actions: {
		search: function(query) {
			this.sendAction('on-search', query);
		},
		watch: function(stream_id){
			this.sendAction('on-watch', stream_id);
		},
		showChannelChooser: function() {
			this.sendAction('showChannelChooser');
		}
	}
});