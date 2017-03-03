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

//TODO: side load vods
    	return this.store.query('schedule-item', {
	    	channel: appParams.channel,
    		start: _start,
    		end: _end,
				include: 'show,reel',
        page_size: -1,
        include_cg_exempt: false
	    })
			.then(runs => {
				return Ember.RSVP.hash({
					runs:runs,
					vods:this.get('store').findAll('vod')
				});
			})
			.then(results=>{
				return Ember.RSVP.hash({
					runs:results.runs,
					transactions:this.store.findAll('vod-transaction')
				});
			})
			.then(results => {
				let runs = results.runs;
				return runs.filter(function(run) {
					return run.get('idType') === 1 &&
								 run.get('cgExempt') === false;
				});
			});
	},

  setupController(controller) {
    this._super(...arguments);
    let appParams = this.paramsFor('application');
    controller.set('channel', this.get('store').peekRecord('channel', appParams.channel));
  }
});
