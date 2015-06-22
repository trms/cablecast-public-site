import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
	cgExempt: attr('boolean'),
	runDateTime: attr('date'),

	channel: DS.belongsTo('channel', {async: true}),
	show: DS.belongsTo('show', {async: true}),

	scheduledTimeString: Ember.computed('runDateTime', {
		get: function() {
			return moment(this.get('runDateTime')).format('h:mm:ss a');
		}
	}),

	scheduledDateTimeString: Ember.computed('runDateTime', {
		get: function() {
			return moment(this.get('runDateTime')).format('LLLL');
		}
	}),

	start: Ember.computed.alias('runDateTime'),

	// TODO: Replace this with a TRT helper
	end: Ember.computed('show', 'runDateTime', {
		get: function() {
			var reels = this.get('show.reels');
			var length = reels.getEach('length')[0];
			var end = moment(this.get('runDateTime')).unix() + length;

			return moment.unix(end).toDate();
		}
	})
});
