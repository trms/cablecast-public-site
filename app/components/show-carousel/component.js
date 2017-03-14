import Ember from 'ember';

export default Ember.Component.extend({
	shows: null,

	firstId: Ember.computed.alias('shows.firstObject.id'),

});
