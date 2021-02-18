import Model, { attr } from '@ember-data/model';

export default Model.extend({
	transactionType: attr('number'),
	percentComplete: attr('number')
});
