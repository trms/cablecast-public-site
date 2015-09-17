import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	reflectBaseUrl: DS.attr('string'),
	embedTemplate: DS.attr('string'),

	show: DS.belongsTo('show', {async: true}),
	channel: DS.belongsTo('channel', {async: true}),
});
