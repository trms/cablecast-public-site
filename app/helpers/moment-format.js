/*globals moment*/
import Ember from 'ember';

export default Ember.Helper.helper(function([date, format]) {
  var formatString = format || 'MMMM Do YYYY, h:mm:ss a'
  return moment(date).format(formatString);
});