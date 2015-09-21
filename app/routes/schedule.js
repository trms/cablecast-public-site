/* globals moment */
import Ember from 'ember';

export default Ember.Route.extend({
	queryParams: {
		currentDay: {
			refreshModel: true
		}
	},
	model: function(params){
		var appParams = this.paramsFor('application');
  		var _start = moment(params.currentDay).startOf('day').format();
			var _end = moment(params.currentDay).add(1, 'days').format();

    	return this.store.find('schedule-item', {
	    	channel: appParams.channel,
    		start: _start,
    		end: _end,
				include: 'show,reel'
	    }).
			then(function(runs) {
				return runs.filter(function(run) {
					return run.get('idType') === 1 &&
								 run.get('cgExempt') === false;
				});
			});
	}
});
