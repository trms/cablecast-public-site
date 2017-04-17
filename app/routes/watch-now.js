import Ember from 'ember';
import SetPageTitle from 'public/mixins/set-page-title';
import GetFutureRuns from 'public/mixins/channel-future-runs-promise';

export default Ember.Route.extend(SetPageTitle, GetFutureRuns,{
  headData: Ember.inject.service(),

  afterModel(model) {
    this.setTitle(model.liveStream.get('name'));
  },

  model(params) {
    let {channel} = this.modelFor('application');

    return Ember.RSVP.hash({
      futureRuns:this.getFutureRuns(channel),
      liveStream:this.store.findRecord('live-stream', params.stream_id),
    });
  }

});
