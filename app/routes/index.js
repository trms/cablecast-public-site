import Ember from 'ember';

export default Ember.Route.extend({
	recentPrograms: null,
	galleryName: 'Latest videos',
	model: function() {
		var appParams = this.paramsFor('application');
		var self = this;
		var channel = this.modelFor('application');
		var galleryName = 'Recent Programs';

		return channel.get('publicSite').
			then(function(site) {
				return Ember.RSVP.hash({
					logo: site.get('logo'),
					carouselSavedSearch: site.get('carouselPrograms'),
					gallerySavedSearch: site.get('gallerySavedSearch')
				});
			}).
			then(function(searches) {
				var galleryPrograms, carouselPrograms, logo;
				logo = searches.logo;
				if (!searches.carouselSavedSearch) {
					carouselPrograms = self.store.find('show', {pageSize: 16});
				} else {
					carouselPrograms = self.store.findByIds('show', searches.carouselSavedSearch.get('results').slice(0, 20));
				}
				if (!searches.gallerySavedSearch) {
					galleryPrograms = self.store.find('show', {pageSize: 16});
				} else {
					galleryName = searches.gallerySavedSearch.get('name');
					galleryPrograms = self.store.findByIds('show', searches.gallerySavedSearch.get('results').slice(0, 20));
				}

				return Ember.RSVP.hash({
					logo: logo,
					channel: channel,
					galleryName: galleryName,
					carouselPrograms: carouselPrograms,
					galleryPrograms: galleryPrograms
				});
			});
	},
	actions: {
		schedule: function(params) {
			this.transitionTo('schedule', params.id)
		}
	}	
});
