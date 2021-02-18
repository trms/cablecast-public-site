import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
	name: attr('string'),
	reflectBaseUrl: attr('string'),
	embedCode: attr('string'),

	show: belongsTo('show', {async: true}),
	channel: belongsTo('channel', {async: true}),
});
