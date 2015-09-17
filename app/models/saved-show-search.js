import DS from 'ember-data';

export default DS.Model.extend({
  query: DS.attr('string'),
  name: DS.attr('string'),
  results: DS.attr('array'),
});