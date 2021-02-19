import classic from 'ember-classic-decorator';
import Model, { attr } from '@ember-data/model';

@classic
export default class SavedShowSearch extends Model {
  @attr()
  query;

  @attr('string')
  name;

  @attr('array')
  results;
}