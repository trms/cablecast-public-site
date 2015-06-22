import DS from 'ember-data';

export default DS.Model.extend({
  fileName: DS.attr('string'),
  show: DS.belongsTo('show', {async: true}),
  vodConfiguration: DS.belongsTo('vod-configuration', {async: true}),
  embedCode: DS.attr('string'),
  url: DS.attr('string')
});