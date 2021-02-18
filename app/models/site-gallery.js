import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  displayName: attr(),
  displayLimit: attr(),
  position: attr('number'),
  publicSite: belongsTo('public-site'),
  savedShowSearch: belongsTo('saved-show-search',{async:false}),
});
