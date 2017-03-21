import DS from 'ember-data';

export default DS.Model.extend({
  query: DS.attr(),
  name: DS.attr('string'),
  results: DS.attr('array'),
});