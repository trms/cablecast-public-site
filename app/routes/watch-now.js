import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import SetPageTitle from 'public/mixins/set-page-title';
import GetFutureRuns from 'public/mixins/channel-future-runs-promise';

export default Route.extend(SetPageTitle, GetFutureRuns,{
  headData: service(),

  afterModel(model) {
    this.setTitle(model.liveStream.get('name'));
  },

  model(params) {
    let {channel} = this.modelFor('application');

    return hash({
      futureRuns:this.getFutureRuns(channel),
      liveStream:this.store.findRecord('live-stream', params.stream_id),
    });
  }

});
