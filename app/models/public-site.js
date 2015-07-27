import DS from 'ember-data';

export default DS.Model.extend({
  siteName: DS.attr('string'),
  logo: DS.belongsTo('web-file', {async: true}),
  carouselSavedSearch: DS.belongsTo('saved-show-search', {async: true}),
  gallerySavedSearch: DS.belongsTo('saved-show-search', {async: true}),
  aboutPageDescription: DS.attr('string'),
  aboutPageShortDescription: DS.attr('string'),
  customColor1: DS.attr('string'),
  customColor2: DS.attr('string'),
  customColor3: DS.attr('string'),
  customColor4: DS.attr('string'),
  twitterUrl: DS.attr('string'),
  facebookUrl: DS.attr('string'),
  blogUrl: DS.attr('string'),
  contactEmail: DS.attr('string'),
  contactPhone: DS.attr('string')
});
