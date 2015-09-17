import DS from 'ember-data';

export default DS.Model.extend({
  quality: DS.attr('string'),
  url: DS.attr('string')
});