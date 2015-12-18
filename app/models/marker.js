import DS from 'ember-data';
var attr = DS.attr;

export default DS.Model.extend({
	vod: DS.belongsTo('vod', {async: true}),
	title: attr('string', {defaultValue: 'New Marker'}),
	body: attr('string', {defaultValue: ''}),
	link: attr('string', {defaultValue: ''}),
	offset: attr('number', {defaultValue: 0}),
	deleted: attr('boolean', {defaultValue: false}),
	
});
