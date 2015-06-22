import Ember from 'ember';

export default Ember.Route.extend({
	recentPrograms: null,
	model: function() {
		var appParams = this.paramsFor('application');
		var self = this;
		var channel = this.store.getById('channel', appParams.channel);


		var carouselPrograms = channel.get('publicSiteConfiguration.carouselSavedSearchId').then(function(savedSearch){
			if (savedSearch === null){
				return self.store.find('show', {
					pageSize: 16,
				});
			}
			var ids = savedSearch.get('results').slice(0, 20);
			return self.store.findByIds('show', ids);
		});

		var galleryPrograms = channel.get('publicSiteConfiguration.gallerySavedSearchId').then(function(savedSearch){
			if (savedSearch === null){
				return self.store.find('show', {
					pageSize: 16,
				});
			}
			var ids = savedSearch.get('results').slice(0, 20);
			return self.store.findByIds('show', ids);
		});

		return Ember.RSVP.hash({
			channel: channel,
			carouselPrograms: carouselPrograms,
			galleryPrograms: galleryPrograms
		});
	},
	actions: {
		schedule: function(params) {
			this.transitionTo('schedule', params.id)
		}
	}	
});
