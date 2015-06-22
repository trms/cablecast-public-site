import DS from 'ember-data';

export default DS.Model.extend({
	vods: DS.hasMany('vod', {async: true}),
	producer: DS.belongsTo('producer', {async: true}),
	category: DS.belongsTo('category', {async: true}),
	project: DS.belongsTo('project', {async: true}),
	reels: DS.hasMany('reel', {async: true}),

	cgTitle: DS.attr('string'),
	cgExempt: DS.attr('boolean'),
	comments: DS.attr('string'),
	title: DS.attr('string'),
	eventDate: DS.attr('string'),

	showThumbnails: DS.hasMany('thumbnail', {async: true}),
	thumbnail: Ember.computed('showThumbnails.@each.quality', {
		get: function() {
			var thumbnail = this.get('showThumbnails').findBy('quality', 'Large');
			// If we still don't have a thumbnail return a placeholder image
			if (!thumbnail) {
				return 'http://placehold.it/720x480';
			}

			return thumbnail.get('url');
		}
	}),

	eventDateString: function(){
		return moment(this.get('eventDate')).format('l');
	}.property('eventDate'),

	hasVod: function(){
		// This doens't work. Not sure why yet.
		console.log(this.get('vods'));
		return this.get('vods');
	}.property('vods'),

	schedule: function(){
		var today = moment();

    	var _start = moment(today).startOf('day').format();
		var _end = moment(today).add(1, 'days').format();
		
    	return this.store.find('schedule-item', {
	    	show_id: this.id,
    		start: _start,
    		end: _end,
    		page_size: 5
	    });
	}.property()
});