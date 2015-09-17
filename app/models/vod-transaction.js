import DS from 'ember-data';

export default DS.Model.extend({
	transactionType: DS.attr('number'),
	percentComplete: DS.attr('number')
});
