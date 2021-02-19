import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Model, { attr, belongsTo } from '@ember-data/model';
import moment from 'moment';

@classic
export default class ScheduleItem extends Model {
  @attr('boolean')
  cgExempt;

  @attr('date')
  runDateTime;

  @attr('number')
  idType;

  @belongsTo('channel', { async: true })
  channel;

  @belongsTo('show', { async: true })
  show;

  @computed('runDateTime')
  get scheduledTimeString() {
    return moment(this.runDateTime).format('h:mm:ss a');
  }

  @computed('runDateTime')
  get scheduledDateTimeString() {
    //return moment(this.get('runDateTime')).format('llll');
    return moment(this.runDateTime).calendar();
  }

  @alias('runDateTime')
  start;

  // TODO: Replace this with a TRT helper
  @computed('show', 'runDateTime')
  get end() {
    var reels = this.get('show.reels');
    if (!reels) {
      return this.runDateTime;
    }

    var length = reels.getEach('length')[0];
    var end = moment(this.runDateTime).unix() + length;

    return moment.unix(end).toDate();
  }
}
