import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo } from '@ember-data/model';

@classic
export default class SiteGallery extends Model {
  @attr()
  displayName;

  @attr()
  displayLimit;

  @attr('number')
  position;

  @belongsTo('public-site')
  publicSite;

  @belongsTo('saved-show-search', {async:false})
  savedShowSearch;
}
