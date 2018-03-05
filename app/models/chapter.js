import DS from 'ember-data';
var attr = DS.attr;

export default DS.Model.extend({
	vod: DS.belongsTo('vod', {async: true}),
	title: attr('string', {defaultValue: 'New Chapter'}),
	body: attr('string', {defaultValue: ''}),
	link: attr('string', {defaultValue: ''}),
	offset: attr('number', {defaultValue: 0}),
	quickAdded: attr('boolean', {defaultValue: false}),
	deleted: attr('boolean', {defaultValue: false}),

});
