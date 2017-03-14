import Ember from 'ember';

export default Ember.Helper.helper(function([start, end]) {
	var now = new Date();
	return start <= now && end > now;
});
