import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

@classic
export default class PublicSite extends Model {
  @attr('string')
  siteName;

  @belongsTo('web-file', { async: true })
  logo;

  @belongsTo('web-file', { async: true })
  squareLogo;

  @belongsTo('saved-show-search', { async: true })
  carouselSavedSearch;

  @attr('string')
  aboutPageDescription;

  @attr('string')
  aboutPageShortDescription;

  @attr('string')
  customColor1;

  @attr('string')
  customColor2;

  @attr('string')
  customColor3;

  @attr('string')
  customColor4;

  @attr('string')
  twitterUrl;

  @attr('string')
  facebookUrl;

  @attr('string')
  blogUrl;

  @attr('string')
  contactEmail;

  @attr('string')
  contactPhone;

  @attr()
  includeInIndex;

  @hasMany('site-gallery')
  siteGalleries;

  @hasMany('field-display')
  fieldDisplays;

  @attr('string')
  googleAnalyticsId;
}
