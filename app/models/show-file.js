import DS from 'ember-data';
var attr = DS.attr;

export default DS.Model.extend({
	show: DS.belongsTo('show', {async: true}),
	files: attr('array')
});