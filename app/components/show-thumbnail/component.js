import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'img',
	quality: 'Small',
	attributeBindings: ['src'],
	src: Ember.computed.alias('thumbnailPath'),

	show: null,

	thumbnailPath: Ember.computed('show.showThumbnails.@each.quality', 'quality', {
		get: function() {
			var thumbnail = this.get('show.showThumbnails').findBy('quality', this.get('quality'));

			// If we can't find the specifiec quality default to first thumbnail
			if (!thumbnail) {
			  thumbnail = this.get('show.showThumbnails.firstObject');
			}

			// If we still don't have a thumbnail return a placeholder image
			if (!thumbnail) {
				return 'http://placehold.it/720x480';
			}

			// If we have a thumbnail return the url.
			return thumbnail.get('url');
		}
	})
});
