/* globals moment */
import DS from 'ember-data';
import Ember from 'ember';

var ArrayProxy = Ember.ArrayProxy.extend(Ember.PromiseProxyMixin);

export default DS.Model.extend({
	name: DS.attr('string'),
	primaryLocation: DS.attr(),
	publicSite: DS.belongsTo('public-site', {async: false}),
	liveStreams: DS.hasMany('live-stream', {async: true}),

});
