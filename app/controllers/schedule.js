/* globals moment */
import { computed } from '@ember/object';

import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ENV from 'public/config/environment';

export default Controller.extend({
	queryParams: ['currentDay'],
	currentDay: moment().format('YYYY-MM-DD'),
  fastboot: service(),
  rootURL: computed(function() {
    return ENV.rootURL;
  }),

	currentDate: computed('currentDay', function() {
		return moment(this.get('currentDay'), 'YYYY-MM-DD').toDate();
	}),

  prevDateString: computed('currentDay', function() {
    var current = moment(this.get('currentDay'));
    return current.add(-1, 'days').format('YYYY-MM-DD');
  }),

  nextDateString: computed('currentDay', function() {
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
