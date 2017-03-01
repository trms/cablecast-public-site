/* globals moment */
import Ember from 'ember';
import ENV from 'public/config/environment';

export default Ember.Controller.extend({
	queryParams: ['currentDay'],
	currentDay: moment().format('YYYY-MM-DD'),
  fastboot: Ember.inject.service(),
  rootURL: Ember.computed(function() {
    return ENV.rootURL;
  }),

	currentDate: Ember.computed('currentDay', function() {
		return moment(this.get('currentDay'), 'YYYY-MM-DD').toDate();
	}),

  prevDateString: Ember.computed('currentDay', function() {
    var current = moment(this.get('currentDay'));
    return current.add(-1, 'days').format('YYYY-MM-DD');
  }),

  nextDateString: Ember.computed('currentDay', function() {
    var current = moment(this.get('currentDay'));
    return current.add(1, 'days').format('YYYY-MM-DD');
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
