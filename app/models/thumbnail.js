import classic from 'ember-classic-decorator';
import Model, { attr } from '@ember-data/model';

@classic
export default class Thumbnail extends Model {
  @attr('string')
  quality;

  @attr('string')
  url;
}