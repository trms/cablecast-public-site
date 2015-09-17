/* globals moment */
import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

export default DS.Model.extend({
	cgExempt: attr('boolean'),
	runDateTime: attr('date'),
	idType: attr('number'),

	channel: DS.belongsTo('channel', {async: true}),
	show: DS.belongsTo('show', {async: true}),

	scheduledTimeString: Ember.computed('runDateTime', {
		get: function() {
			return moment(this.get('runDateTime')).format('h:mm:ss a');
		}
	}),

	scheduledDateTimeString: Ember.computed('runDateTime', {
		get: function() {
			//return moment(this.get('runDateTime')).format('llll');
			return moment(this.get('runDateTime')).calendar();
		}
	}),

	start: Ember.computed.alias('runDateTime'),

	// TODO: Replace this with a TRT helper
	end: Ember.computed('show', 'runDateTime', {
		get: function() {
			var reels = this.get('show.reels');
			if (!reels) { return this.get('runDateTime'); }

			var length = reels.getEach('length')[0];
			var end = moment(this.get('runDateTime')).unix() + length;

			return moment.unix(end).toDate();
		}
	})
});
