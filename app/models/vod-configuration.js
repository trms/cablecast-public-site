import Model, { attr } from '@ember-data/model';

export default Model.extend({
	embedTemplate: attr('string'),
	vodServerBaseUrl: attr('string'),
	cablecastServerBaseUrl: attr('string')
});