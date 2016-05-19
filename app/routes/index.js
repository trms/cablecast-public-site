import Ember from 'ember';

function filterShows(shows) {
	return shows.filter(function(show) {
		return Ember.get(show, 'showThumbnails.length') > 0 && Ember.get(show, 'cgExempt') === false;
	}).slice(0, 16);
}

export default Ember.Route.extend({
	recentPrograms: null,
	galleryName: 'Latest videos',
	model: function() {
		var self = this;
		var channel = this.modelFor('application');
		var galleryName = 'Recent Programs';

		return channel.get('publicSite').
			then(function(site) {
				return Ember.RSVP.hash({
					logo: site.get('logo'),
					carouselSavedSearch: site.get('carouselSavedSearch'),
					gallerySavedSearch: site.get('gallerySavedSearch')
				});
			}).
			then(function(searches) {
				var galleryPrograms, carouselPrograms, logo;
				logo = searches.logo;
				if (!searches.carouselSavedSearch) {
					carouselPrograms = self.store.query('show', { pageSize: 50, include: 'vod,thumbnail'});
				} else {
					carouselPrograms = self.store.findByIds('show', searches.carouselSavedSearch.get('results').slice(0, 50));
				}
				if (!searches.gallerySavedSearch) {
					galleryPrograms = self.store.query('show', {pageSize: 50, include: 'vod,thumbnail,project,category,producer'});
				} else {
					galleryName = searches.gallerySavedSearch.get('name');
					galleryPrograms = self.store.findByIds('show', searches.gallerySavedSearch.get('results').slice(0, 50));
				}

				return Ember.RSVP.hash({
					logo: logo,
					channel: channel,
					schedule: channel.get('schedule'),
					galleryName: galleryName,
					carouselPrograms: carouselPrograms.then(filterShows),
					galleryPrograms: galleryPrograms.then(filterShows)
				});
			}).
			catch(function() {
				// If there is an error just return some defaults
				return Ember.RSVP.hash({
					logo: null,
					channel: channel,
					galleryName: 'Recent Programs',
					carouselPrograms: self.store.query('show', {pageSize: 50}).then(filterShows),
					galleryPrograms: self.store.query('show', {pageSize: 50}).then(filterShows)
				});
			});
	},
	actions: {
		schedule: function(params) {
			this.transitionTo('schedule', params.id);
		}
	}
});
