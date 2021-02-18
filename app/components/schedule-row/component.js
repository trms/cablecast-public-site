import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
    tagName: '',

    isOnAir: computed('item.{start,end}', {
		get: function() {
			var now = new Date();
			var start = this.get('item.start');
			var end = this.get('item.end');
			return start <= now && end > now;
		}
	})
});
