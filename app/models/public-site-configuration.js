import DS from 'ember-data';

export default DS.Model.extend({
  channel: DS.belongsTo('channel'),
  name: DS.attr('string'),
  slogan: DS.attr('string'),
  logo: DS.attr('string'),
  homeTitle: DS.attr('string'),
  homeHtml: DS.attr('string'),
  aboutTitle: DS.attr('string'),
  aboutHtml: DS.attr('string'),
  color: DS.attr('string'),
  highlightColor: DS.attr('string')
});
