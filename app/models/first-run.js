import classic from 'ember-classic-decorator';
import Model, { belongsTo, attr } from '@ember-data/model';

@classic
export default class FirstRun extends Model {
  @belongsTo('channel', { async: true })
  channel;

  @belongsTo('show', { async: true })
  show;

  @belongsTo('schedule-item', { async: true })
  scheduleItem;

  @attr('date')
  runDateTime;
}
