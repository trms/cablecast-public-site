import Ember from 'ember';
import toTimecode from 'public/utils/timecode';

export default Ember.Helper.helper(function(input) {
	return toTimecode(input);
});
