import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
	show: belongsTo('show', {async: true}),
	files: attr('array')
});