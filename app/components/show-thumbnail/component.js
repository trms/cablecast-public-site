import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
	classNames: ['show-thumbnail'],
	tagName: 'img',
	quality: 'Small',
	attributeBindings: ['src'],
	src: alias('thumbnailPath'),

	show: null,

	thumbnailPath: computed('show.showThumbnails.@each.quality', 'quality', {
		get: function () {
			var thumbnail = this.get('show.showThumbnails').findBy('quality', this.get('quality'));

			// If we can't find the specifiec quality default to first thumbnail
			if (!thumbnail) {
				thumbnail = this.get('show.showThumbnails.firstObject');
			}

			// If we have a thumbnail return the url.
			return thumbnail.get('url');
		}
	})
});
