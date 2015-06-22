import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		console.log("Got here");
		var show = this.modelFor('show');

		var today = moment();

    	var _start = moment(today).startOf('day').format();
		var _end = moment(today).add(1, 'days').format();
		
    	return this.store.find('schedule-item', {
	    	show_id: show.id,
    		start: _start,
    		end: _end
	    });
	}
});
