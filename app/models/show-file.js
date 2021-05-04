import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo } from '@ember-data/model';

@classic
export default class ShowFile extends Model {
  @belongsTo('show', { async: true })
  show;

  @attr('array')
  files;
}
