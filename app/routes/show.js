import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		var start = new Date();
		return Ember.RSVP.hash({
			show: this.store.query('show', {
        ids: [params.id],
        include: 'thumbnail,vod'
      })
      .then(function(result) {
        debugger;
        return result.findBy('id', params.id);
      }),
			runs: this.store.query('schedule-item', {
	    	show: params.id,
    		start: start.toISOString(),
    		page_size: 5
	    })
		});
	}
});
