import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import SetPageTitle from 'cablecast-public-site/mixins/set-page-title';
import GetFutureRuns from 'cablecast-public-site/mixins/channel-future-runs-promise';

@classic
export default class WatchNowRoute extends Route.extend(
  SetPageTitle,
  GetFutureRuns
) {
  @service
  headData;

  afterModel(model) {
    this.setTitle(model.liveStream.get('name'));
  }

  model(params) {
    let { channel } = this.modelFor('application');

    return hash({
      futureRuns: this.getFutureRuns(channel),
      liveStream: this.store.findRecord('live-stream', params.stream_id),
    });
  }
}
