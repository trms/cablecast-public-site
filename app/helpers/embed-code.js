import Ember from 'ember';

export function embedCode(input) {
	console.log(input);
	var output = input;
	return output;
}

export default Ember.Handlebars.makeBoundHelper(embedCode);
