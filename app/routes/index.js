import Ember from 'ember';

export default Ember.Route.extend({
	recentPrograms: null,
	galleryName: 'Latest videos',
	model: function() {
		var appParams = this.paramsFor('application');
		var self = this;
		var channel = this.modelFor('application');


		var carouselPrograms = Ember.RSVP.resolve(channel.get('publicSiteConfiguration.carouselSavedSearch')).then(function(savedSearch){
			if (savedSearch === null){
				return self.store.find('show', {
					pageSize: 16,
				});
			}
			var ids = savedSearch.get('results').slice(0, 20);
			return self.store.findByIds('show', ids);
		})
		.then(function(shows) {
			return shows.filter(function(show) {
				return show.get('showThumbnails.length') > 0;
			});
		});

		var galleryPrograms = Ember.RSVP.resolve(channel.get('publicSiteConfiguration.gallerySavedSearch')).then(function(savedSearch){
			if (savedSearch === null){				
				return self.store.find('show', {
					pageSize: 16,
				});
			} else {
				
			}
			var ids = savedSearch.get('results').slice(0, 20);
			return self.store.findByIds('show', ids);
		})
		.then(function(shows) {
			return shows.filter(function(show) {
				return show.get('showThumbnails.length') > 0;
			});
		});

		var galleryName = channel.get('publicSiteConfiguration.gallerySavedSearch').then(function(savedSearch){
			if (!savedSearch) {return 'Recent Programs'; }
			return savedSearch.get('name');
		});

		return Ember.RSVP.hash({
			channel: channel,
			carouselPrograms: carouselPrograms,
			galleryPrograms: galleryPrograms,
			galleryName: galleryName
		});
	},
	actions: {
		schedule: function(params) {
			this.transitionTo('schedule', params.id)
		}
	}	
});
