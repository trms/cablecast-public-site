import DS from 'ember-data';

export default DS.Model.extend({
  displayName: DS.attr(),
  displayLimit: DS.attr(),
  position: DS.attr('number'),
  publicSite: DS.belongsTo('public-site'),
  savedShowSearch: DS.belongsTo('saved-show-search',{async:false}),
});
