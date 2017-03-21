/* globals moment */
import Ember from 'ember';

export default Ember.Route.extend({
	headData: Ember.inject.service(),

	queryParams: {
		currentDay: {
			refreshModel: true
		}
	},

  afterModel() {
    let headData = this.get('headData');
    headData.set('title', 'Schedule');
  },

	model: function(params){
		var appParams = this.paramsFor('application');
  		var _start = moment(params.currentDay).startOf('day').format();
			var _end = moment(params.currentDay).add(1, 'days').format();

    	return this.store.query('schedule-item', {
	    	channel: appParams.channel,
    		start: _start,
    		end: _end,
				include: 'show,reel,vod,vodTransaction',
        page_size: -1,
        include_cg_exempt: false
	    })
			.then(runs => {
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
