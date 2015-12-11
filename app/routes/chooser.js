import Ember from 'ember';

export default Ember.Route.extend({
	
	model: function() {
		return Ember.RSVP.hash({
			publicSites: this.store.find('public-site'),
			channels: this.store.find('channel')
		});
	}
});
