import Ember from 'ember';
import SetPageTitle from 'public/mixins/set-page-title';

export default Ember.Route.extend(SetPageTitle, {
	setHeadData(show) {
    let data = {
			type: 'video.episode',
			card: 'summary_large_image',
			title: show.get('cgTitle'),
			description: show.get('comments') || show.get('cgTitle')
		};
		let thumbnailUrl = this.findAThumbnailUrl(show);
		if (thumbnailUrl) {
			data.image = thumbnailUrl;
		}
		let headData = this.get('headData');
		headData.set('socialMedia', data);

		this.appendJsonLD(data, show);

		this.setTitle(show.get('cgTitle'));
	},

	findAThumbnailUrl(show) {
		let thumbnail = show.get('showThumbnails').findBy('quality', 'Large');
		if (!thumbnail) {
			thumbnail = show.get('showThumbnails.firstObject');
		}
		if (thumbnail) {
			return encodeURI(thumbnail.get('url'));
		}
		return this.get('headData.socialMedia.image');
	},

	appendJsonLD(data, show) {
		let jsonLD = {
			"@context": "http://schema.org",
			"@type": "TVClip"
		};
		if (data.image) {
			jsonLD.thumbnailUrl = data.image;
		}
		let eventDate = show.get('eventDateString');
		if (eventDate) {
			jsonLD.datePublished = eventDate;
		}
		if (data.title) {
			jsonLD.headline = data.title;
		}
		let headData = this.get('headData');
		headData.set('jsonLD', JSON.stringify(jsonLD));
	},

	model: function(params) {
		var start = new Date();
    var self = this;
		return Ember.RSVP.hash({
			shows: this.store.query('show', {
        ids: [params.id],
        include: 'vod,vodtransaction,scheduleitem,thumbnail,chapter,firstrun,producer'
      }),
			runs: this.store.query('schedule-item', {
        show: params.id,
        start: start.toISOString(),
        page_size: 5
      }),
      channels: this.store.findAll('channel')
		})
		.then(({shows, runs})=>{
			let show = self.store.peekRecord('show', params.id);
			return Ember.RSVP.hash({
				show: show,
				runs: runs
    	});
		});
	},

	afterModel: function(model) {
		this.setHeadData(model.show);
	},

  setupController: function(controller, model) {
    var params = this.paramsFor(this.get('routeName'));
    if (model.show.get('vods.firstObject.chapters.length') || params.seekto) {
      controller.set('activeTab', 'chapters');
    }
    controller.set('model', model);
  },

  resetController: function(controller) {
    controller.set('activeTab', 'details');
    controller.set('seekto', null);
  }

});
