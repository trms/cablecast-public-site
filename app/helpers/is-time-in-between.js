import Ember from 'ember';

export function isTimeInBetween(start, end) {
	var now = new Date();
	return start <= now && end > now;
}

export default Ember.Handlebars.makeBoundHelper(isTimeInBetween);
