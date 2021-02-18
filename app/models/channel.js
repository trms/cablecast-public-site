import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default Model.extend({
	name: attr('string'),
	primaryLocation: attr(),
	publicSite: belongsTo('public-site', {async: false}),
	liveStreams: hasMany('live-stream', {async: true}),
});
