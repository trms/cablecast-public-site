import DS from 'ember-data';

export default DS.Model.extend({
  label: DS.attr(),
  field: DS.attr(),
  publicSite: DS.belongsTo('public-site', {async: true}),
  showField: DS.attr('number'),
  widget: DS.attr(),
  order: DS.attr('number')
});
