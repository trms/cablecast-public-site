import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	publicSiteConfiguration: DS.belongsTo('public-site-configuration', {async: true}),
	channelContactInfo: DS.belongsTo('channel-contact-info', {async: true}),

	vods: DS.hasMany('vod', {async: true}),
	shows: DS.hasMany('show', {async: true}),
	liveStreams: DS.hasMany('live-stream', {async: true}),

	newVods: function(){
		return this.store.find('vod', {
			sort: 'eventDate',
			sort_order: 'descending',
			page_size: '10'
		});
	}.property('vod'),

	schedule: function(){
		var today = moment();
		var _start = moment(today).startOf('hour').toISOString();
		var _end = moment(today).add(24, 'hours').toISOString();

		return this.store.find('schedule-item', {
			start: _start,
			end: _end,
			page_size: '6',
			channel_id: this.get('id')
		});
	}.property()
	
});
