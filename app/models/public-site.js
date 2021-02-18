import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default Model.extend({
  siteName: attr('string'),
  logo: belongsTo('web-file', {async: true}),
  squareLogo: belongsTo('web-file', {async: true}),
  carouselSavedSearch: belongsTo('saved-show-search', {async: true}),
  aboutPageDescription: attr('string'),
  aboutPageShortDescription: attr('string'),
  customColor1: attr('string'),
  customColor2: attr('string'),
  customColor3: attr('string'),
  customColor4: attr('string'),
  twitterUrl: attr('string'),
  facebookUrl: attr('string'),
  blogUrl: attr('string'),
  contactEmail: attr('string'),
  contactPhone: attr('string'),
  includeInIndex: attr(),
  siteGalleries: hasMany('site-gallery'),
  fieldDisplays: hasMany('field-display'),
  googleAnalyticsId: attr('string')
});
