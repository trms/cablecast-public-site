import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo } from '@ember-data/model';

@classic
export default class Livestream extends Model {
  @attr('string')
  name;

  @attr('string')
  reflectBaseUrl;

  @attr('string')
  embedTemplate;

  @belongsTo('show', { async: true })
  show;

  @belongsTo('channel', { async: true })
  channel;
}
