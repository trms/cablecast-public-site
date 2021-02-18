import Model, { attr } from '@ember-data/model';

export default Model.extend({
  query: attr(),
  name: attr('string'),
  results: attr('array'),
});