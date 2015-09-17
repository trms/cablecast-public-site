/*globals moment*/
import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  return moment(params[0]).calendar(null, {
    sameDay: '[Today] [at] LT',
    nextWeek: 'M/D [at] LT',
    sameElse: 'M/D [at] LT'
  });
});
