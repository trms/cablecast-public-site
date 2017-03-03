import Ember from 'ember';

export default Ember.Route.extend({
	headData: Ember.inject.service(),

	setHeadData(show) {
    let thumbnail = show.get('showThumbnails').findBy('quality', 'Large');
    if (!thumbnail) {
      thumbnail = show.get('showThumbnails.firstObject');
    }
		let headData = this.get('headData');
		let data = {
			card:'summary_large_image',
			title:show.get('cgTitle'),
			description: show.get('comments') || show.get('cgTitle'),
			image: (thumbnail ? thumbnail.get('url') : null)
		};
		headData.set('socialMedia', data);
	},

	model: function(params) {
		var start = new Date();
    var self = this;
		return Ember.RSVP.hash({
			shows: this.store.query('show', {
        ids: [params.id],
        include: 'vod,scheduleitem,thumbnail,chapter'
      }),
			runs: this.store.query('schedule-item', {
		    	show: params.id,
	    		start: start.toISOString(),
	    		page_size: 5
		    })
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
