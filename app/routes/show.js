import Ember from 'ember';

export default Ember.Route.extend({

	model: function(params) {
		var start = new Date();
		return Ember.RSVP.hash({
			show: this.store.find('show', params.id),
			runs: this.store.find('schedule-item', {
		    	show: params.id,
	    		start: start.toISOString(),
	    		page_size: 5
		    })
		});
	},

  setupController: function(controller, model) {
    var params = this.paramsFor(this.get('routeName'));
    if (params.seekto) {
      controller.set('showingDetails', false);
      controller.set('showingChapters', true);
    }
    controller.set('model', model);
  },

  resetController: function(controller) {
    controller.set('seekto', null);
  }

});
