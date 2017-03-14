/* globals moment */
import DS from 'ember-data';
import Ember from 'ember';

var ArrayProxy = Ember.ArrayProxy.extend(Ember.PromiseProxyMixin);

export default DS.Model.extend({
	name: DS.attr('string'),
	primaryLocation: DS.attr(),
	publicSite: DS.belongsTo('public-site', {async: true}),

	liveStreams: DS.hasMany('live-stream', {async: true}),

	onAirRun: null,
	futureRuns: null,
	defaultPageSizeForScheduledRuns: 6,

	newVods: function(){
		return this.store.query('vod', {
			sort_order: 'descending',
			sort: 'eventDate',
			page_size: '10'
		});
	}.property('vod'),

	schedule: Ember.computed({
		get: function(){
			var self = this;
			var today = moment();
			var _start = moment().startOf('day').toISOString();//moment().startOf('hour').toISOString();
			var _end = moment(today).add(24, 'hours').toISOString();

			var promise = this.store.query('schedule-item', {
				start: _start,
				end: _end,
				channel: this.get('id'),
				include: 'show,reel',
        include_cg_exempt: false,
        page_size: -1
			}).
			then(function(items) {
				return items.filter(function(run) {
					return run.get('idType') === 1 &&
								 run.get('cgExempt') === false;
				});
			}).then(function(items){
				// Map runs that have already started but not yet ended.
				return items.reject(function(item /*, index, enumerable*/){
					var now = new Date();
					var start = item.get('start');
					var end = item.get('end');

					// Step 1: Check to see if item is on air now. if it is, place it on onAirRun and remove frmo the list
					// Step 2: check to see if item previously aired. If it did, remove it from the list
					// Step 3: Check to see if the item will air, if it will, add it to future runs.

					//1
					if (start <= now && end > now) {
						this.set('onAirRun', item);
						return true;	// Remove from the list - Should this item be rejected? YES
					}

					//2 - The run started earlier than now and ended earlier than now. The run
					// 	has aired and is no longer on air.
					if (start < now && end < now) {
						return true;	// Should this item be rejected? YES!
					}

					//3 - The run hasn't aired yet
					if (start > now) {
						return false;	// Should this item be rejected? NOOOOOO!
					}


				}, self);
			}).then(function(items){
				var schedule = items.slice(0,self.get('defaultPageSizeForScheduledRuns'));
				self.set('futureRuns', schedule);
				return schedule;
			});

			return ArrayProxy.create({
				promise: promise
			});
		}
	}),





});
