import Ember from 'ember';

export default Ember.Route.extend({

	model: function(params) {
		var start = new Date();
    var self = this;
		return Ember.RSVP.hash({
			shows: this.store.find('show', {
        ids: [params.id],
        include: 'vod,scheduleitem,thumbnail,chapter'
      }),
			runs: this.store.find('schedule-item', {
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

  setupController: function(controller, model) {
    var params = this.paramsFor(this.get('routeName'));
    if (model.show.get('vods.firstObject.markers.length') || params.seekto) {
      debugger;
      controller.set('activeTab', 'chapters');
    }
    controller.set('model', model);
  },

  resetController: function(controller) {
    controller.set('activeTab', 'details');
    controller.set('seekto', null);
  }

});
