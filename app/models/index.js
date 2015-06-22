// Deprecated
import DS from 'ember-data';

export default DS.Model.extend({
	vods: DS.hasMany('vod', {async: true}),
	shows: DS.hasMany('show', {async: true}),

	channel: DS.belongsTo('channel'),

	newVods: function(){
		var today = moment();
		return this.store.find('vod', {
    		sort: 'eventDate',
    		sort_order: 'descending',
    		page_size: '10'
	    });
	}.property('vod'),

	schedule: function(){
		var today = moment();

    	var _start = moment(today).startOf('hour').format();
		var _end = moment(today).add(3, 'hours').format();
		
    	return this.store.find('schedule-item', {
    		start: _start,
    		end: _end,
    		page_size: '3'
	    });
	}.property()
});
