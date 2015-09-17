import Ember from 'ember';

export default Ember.Component.extend({
	shows: null,

	firstId: Ember.computed.alias('shows.firstObject.id'),

	actions: {
		previousSlide: function(){},
		nextSlide: function(){}
	},
	previousSlide: function() {
        this.$().carousel('prev');
    },
    nextSlide: function() {
        this.$().carousel('next');
    },
});
