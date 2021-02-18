import { alias } from '@ember/object/computed';
import moment from 'moment';

import { computed } from '@ember/object';
import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
	cgExempt: attr('boolean'),
	runDateTime: attr('date'),
	idType: attr('number'),

	channel: DS.belongsTo('channel', {async: true}),
	show: DS.belongsTo('show', {async: true}),

	scheduledTimeString: computed('runDateTime', {
		get: function() {
			return moment(this.runDateTime).format('h:mm:ss a');
		}
	}),

	scheduledDateTimeString: computed('runDateTime', {
		get: function() {
			//return moment(this.get('runDateTime')).format('llll');
			return moment(this.runDateTime).calendar();
		}
	}),

	start: alias('runDateTime'),

	// TODO: Replace this with a TRT helper
	end: computed('show', 'runDateTime', {
		get: function() {
			var reels = this.get('show.reels');
			if (!reels) { return this.runDateTime; }

			var length = reels.getEach('length')[0];
			var end = moment(this.runDateTime).unix() + length;

			return moment.unix(end).toDate();
		}
	})
});
