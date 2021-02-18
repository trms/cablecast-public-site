import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  label: attr(),
  field: attr(),
  publicSite: belongsTo('public-site', {async: true}),
  showField: attr('number'),
  widget: attr(),
  order: attr('number')
});