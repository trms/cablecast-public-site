import Ember from 'ember';
import SetPageTitle from 'public/mixins/set-page-title';

export default Ember.Route.extend(SetPageTitle, {
	setHeadData(show) {
    let thumbnail = show.get('showThumbnails').findBy('quality', 'Large');
    if (!thumbnail) {
      thumbnail = show.get('showThumbnails.firstObject');
    }
		let headData = this.get('headData');
		let data = {
			type: 'video.episode',
			card: 'summary_large_image',
			title: show.get('cgTitle'),
			description: show.get('comments') || show.get('cgTitle'),
			image: (thumbnail ? encodeURI(thumbnail.get('url')) : null)
		};
		headData.set('socialMedia', data);
		this.setTitle(show.get('cgTitle'));
	},

	model: function(params) {
		var start = new Date();
    var self = this;
		return Ember.RSVP.hash({
			shows: this.store.query('show', {
        ids: [params.id],
        include: 'vod,vodtransaction,scheduleitem,thumbnail,chapter,firstrun'
      }),
			runs: this.store.query('schedule-item', {
        show: params.id,
        start: start.toISOString(),
        page_size: 5
      }),
      channels: this.store.findAll('channel'),
		}).
		then(function(data) {
      return {
        show: self.store.peekRecord('show', params.id),
        runs: data.runs
      };
    });
	},

  afterModel(model) {
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
