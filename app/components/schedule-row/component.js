import Ember from 'ember';

export default Ember.Component.extend({
	isOnAir: Ember.computed('item.start', 'item.end', {
		get: function() {
			var now = new Date();
			var start = this.get('item.start');
			var end = this.get('item.end');
			return start <= now && end > now;
		}
	})
});
