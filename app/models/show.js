import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model, { hasMany, belongsTo, attr } from '@ember-data/model';
import moment from 'moment';

@classic
export default class Show extends Model {
    @hasMany('vod', { async: true })
    vods;

    @belongsTo('producer', { async: true })
    producer;

    @belongsTo('category', { async: true })
    category;

    @belongsTo('project', { async: true })
    project;

    @hasMany('reel', { async: true })
    reels;

    @attr()
    customFields;

    @attr('string')
    cgTitle;

    @attr('boolean')
    cgExempt;

    @attr('string')
    comments;

    @attr('string')
    title;

    @attr('string')
    eventDate;

    @attr('number')
    totalRunTime;

    @attr('number')
    runCount;

    @hasMany('thumbnail', { async: true })
    showThumbnails;

    @hasMany('first-run', { async: true })
    firstRuns;

    @computed('firstRuns.@each.runDateTime')
    get absoluteFirstRun() {
		var sorted = this.firstRuns.sortBy('runDateTime');
		return sorted.get('firstObject');
	}

    @computed('showThumbnails.@each.quality')
    get thumbnail() {
        var thumbnail = this.showThumbnails.findBy('quality', 'Large');
        // If we still don't have a thumbnail return a placeholder image
        if (!thumbnail) {
            return 'http://placehold.it/720x480';
        }

        return thumbnail.get('url');
    }

    @computed('eventDate')
    get eventDateString() {
		return moment(this.eventDate).format('l');
	}

    @computed
    get schedule() {
		var today = moment();

		var _start = moment(today).startOf('day').format();

		return this.store.query('schedule-item', {
			show: this.id,
			start: _start,
			page_size: 5
		});
	}
}
