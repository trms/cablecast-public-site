import { computed } from '@ember/object';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
	vods: DS.hasMany('vod', { async: true }),
	producer: DS.belongsTo('producer', { async: true }),
	category: DS.belongsTo('category', { async: true }),
	project: DS.belongsTo('project', { async: true }),
	reels: DS.hasMany('reel', { async: true }),
	customFields: DS.attr(),

	cgTitle: DS.attr('string'),
	cgExempt: DS.attr('boolean'),
	comments: DS.attr('string'),
	title: DS.attr('string'),
	eventDate: DS.attr('string'),
	totalRunTime: DS.attr('number'),
	runCount: DS.attr('number'),
	showThumbnails: DS.hasMany('thumbnail', { async: true }),
	firstRuns: DS.hasMany('first-run', { async: true }),
	absoluteFirstRun: computed('firstRuns.@each.runDateTime', function () {
		var sorted = this.firstRuns.sortBy('runDateTime');
		return sorted.get('firstObject');
	}),
	thumbnail: computed('showThumbnails.@each.quality', {
		get: function () {
			var thumbnail = this.showThumbnails.findBy('quality', 'Large');
			// If we still don't have a thumbnail return a placeholder image
			if (!thumbnail) {
				return 'http://placehold.it/720x480';
			}

			return thumbnail.get('url');
		}
	}),

	eventDateString: computed('eventDate', function () {
		return moment(this.eventDate).format('l');
	}),

	schedule: computed(function () {
		var today = moment();

		var _start = moment(today).startOf('day').format();

		return this.store.query('schedule-item', {
			show: this.id,
			start: _start,
			page_size: 5
		});
	})
});
