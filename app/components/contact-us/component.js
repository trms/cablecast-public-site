import Ember from 'ember';

export default Ember.Component.extend({
	channelContactInfo: null,
	facebook: Ember.computed.alias('channelContactInfo.facebook'),
	twitter: Ember.computed.alias('channelContactInfo.twitter')
});