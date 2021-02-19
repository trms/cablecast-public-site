import classic from 'ember-classic-decorator';
import Model, { attr } from '@ember-data/model';

@classic
export default class WebFile extends Model {
  @attr('string')
  url;

  @attr('string')
  name;
}