import Model, { hasMany, belongsTo, attr } from '@ember-data/model';
import { computed } from '@ember/object';
import moment from 'moment';

export default Model.extend({
	vods: hasMany('vod', { async: true }),
	producer: belongsTo('producer', { async: true }),
	category: belongsTo('category', { async: true }),
	project: belongsTo('project', { async: true }),
	reels: hasMany('reel', { async: true }),
	customFields: attr(),

	cgTitle: attr('string'),
	cgExempt: attr('boolean'),
	comments: attr('string'),
	title: attr('string'),
	eventDate: attr('string'),
	totalRunTime: attr('number'),
	runCount: attr('number'),
	showThumbnails: hasMany('thumbnail', { async: true }),
	firstRuns: hasMany('first-run', { async: true }),
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
