/* globals moment */
import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['currentDay'],
	currentDay: moment().format('YYYY-MM-DD'),

	currentDate: Ember.computed('currentDay', function() {
		return moment(this.get('currentDay'), 'YYYY-MM-DD').toDate();
	}),

	actions: {
		prevDay: function() {
			var current = moment(this.get('currentDay'));
			current.add(-1, 'days');
			this.set('currentDay', current.format('YYYY-MM-DD'));
		},
		nextDay: function() {
			var current = moment(this.get('currentDay'));
			current.add(1, 'days');
			this.set('currentDay', current.format('YYYY-MM-DD'));
		}
	}
});
