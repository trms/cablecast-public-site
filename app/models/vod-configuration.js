import DS from 'ember-data';

export default DS.Model.extend({
	embedTemplate: DS.attr('string'),
  	vodServerBaseUrl: DS.attr('string'),
  	cablecastServerBaseUrl: DS.attr('string')
});