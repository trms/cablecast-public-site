import Ember from 'ember';
import SetPageTitle from 'public/mixins/set-page-title';

export default Ember.Route.extend(SetPageTitle, {
  headData: Ember.inject.service(),

  afterModel(model) {
    this.setTitle(model.liveStream.get('name'));
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
