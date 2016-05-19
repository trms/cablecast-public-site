import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		var start = new Date();
		return Ember.RSVP.hash({
			show: this.store.findRecord('show', params.id),
			runs: this.store.query('schedule-item', {
	    	show: params.id,
    		start: start.toISOString(),
    		page_size: 5
	    })
		});
	}
});
