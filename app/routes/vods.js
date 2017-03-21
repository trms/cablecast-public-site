import Ember from 'ember';

export default Ember.Route.extend({
	headData: Ember.inject.service(),

	afterModel() {
		let headData = this.get('headData');
		headData.set('title', 'Vods');
	},

	model: function() {
    return this.store.findAll('vod');
  }
});
