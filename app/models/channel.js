import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	primaryLocation: DS.attr(),
	publicSite: DS.belongsTo('public-site', {async: false}),
	liveStreams: DS.hasMany('live-stream', {async: true}),
});
