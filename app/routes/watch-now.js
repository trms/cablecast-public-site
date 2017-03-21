import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  afterModel(model) {
    let headData = this.get('headData');
    headData.set('title', model.liveStream.get('name'));
  },

  model: function(params) {
    return this.store.findRecord('live-stream', params.stream_id).
  						then(function(liveStream){
  							var channel = liveStream.get('channel');
  							return Ember.RSVP.hash({
  								liveStream: liveStream,
  								channel: channel,
  								schedule: channel.get('schedule')
  							});
  						});
  }

});
