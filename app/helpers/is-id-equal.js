import Ember from 'ember';

export function isIdEqual(classOne, classTwo, firstId, secondId) {
	if (firstId === secondId){
		return classOne + " " + classTwo;
	} else {
		return classOne;
	}
}

export default Ember.Handlebars.makeBoundHelper(isIdEqual);
