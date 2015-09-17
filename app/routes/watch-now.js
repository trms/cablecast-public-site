import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('live-stream', params.stream_id).
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
