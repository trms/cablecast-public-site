import { computed } from '@ember/object';
import moment from 'moment';

import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ENV from 'cablecast-public-site/config/environment';

const currentDay = moment().format('YYYY-MM-DD');

export default Controller.extend({
	queryParams: ['currentDay'],
	currentDay,
  fastboot: service(),
  rootURL: computed(function() {
    return ENV.rootURL;
  }),

	currentDate: computed('currentDay', function() {
		return moment(this.currentDay, 'YYYY-MM-DD').toDate();
	}),

  prevDateString: computed('currentDay', function() {
    var current = moment(this.currentDay);
    return current.add(-1, 'days').format('YYYY-MM-DD');
  }),

  nextDateString: computed('currentDay', function() {
    var current = moment(this.currentDay);
    return current.add(1, 'days').format('YYYY-MM-DD');
  }),

	actions: {
		changeDate(date) {
			let current = moment(date);
			this.set('currentDay', current.format('YYYY-MM-DD'));
		},
		prevDay: function() {
			var current = moment(this.currentDay);
			current.add(-1, 'days');
			this.set('currentDay', current.format('YYYY-MM-DD'));
		},
		nextDay: function() {
			var current = moment(this.currentDay);
			current.add(1, 'days');
			this.set('currentDay', current.format('YYYY-MM-DD'));
		}
	}
});
