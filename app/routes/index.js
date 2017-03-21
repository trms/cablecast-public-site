import Ember from 'ember';

function filterShows(shows) {
	return shows.filter(function(show) {
		return Ember.get(show, 'showThumbnails.length') > 0 && Ember.get(show, 'cgExempt') === false;
	}).slice(0, 16);
}

export default Ember.Route.extend({
	recentPrograms: null,
	galleryName: 'Latest videos',
	headData: Ember.inject.service(),

	activate: function() {
		var channel = this.modelFor('application').channel;
		let headData = this.get('headData');
		headData.set('title', channel.get('name'));
	},

	model: function() {
		var self = this;
		var channel = this.modelFor('application').channel;
		var galleryName = 'Recent Programs';
    var defaultQuery = {pageSize: 50, location: channel.get('primaryLocation')};

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
					carouselPrograms = self.store.query('show', defaultQuery);
				} else {
					carouselPrograms = self.store.query('show', {
            ids: searches.carouselSavedSearch.get('results').slice(0, 50),
            include: 'thumbnail,vod,category,project,producer,reel'
          });
				}
				if (!searches.gallerySavedSearch) {
					galleryPrograms = self.store.query('show', defaultQuery);
				} else {
					galleryName = searches.gallerySavedSearch.get('name');
					galleryPrograms = self.store.query('show', {
            ids: searches.gallerySavedSearch.get('results').slice(0, 50),
            include: 'thumbnail,vod,category,project,producer,reel'
          });
				}

				return Ember.RSVP.hash({
					logo: logo,
					channel: channel,
					schedule: channel.get('schedule'),
					galleryName: galleryName,
					carouselPrograms: carouselPrograms.then(filterShows),
					galleryPrograms: galleryPrograms.then(filterShows),
          categories: self.get('store').findAll('category'),
          projects: self.get('store').findAll('project'),
          producers: self.get('store').findAll('producer')
				});
			}).
			catch(function() {
				// If there is an error just return some defaults
				return Ember.RSVP.hash({
					logo: null,
					channel: channel,
					galleryName: 'Recent Programs',
					carouselPrograms: self.store.query('show', defaultQuery).then(filterShows),
					galleryPrograms: self.store.query('show', defaultQuery).then(filterShows)
				});
			});
	},
	actions: {
		schedule: function(params) {
			this.transitionTo('schedule', params.id);
		}
	}
});
