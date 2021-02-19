import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class ChannelsController extends Controller {
  @computed
  get allChannels() {
    return this.store.peekAll('channel');
  }

  @computed('allChannels.[]')
  get publicChannels() {
    return this.allChannels.filterBy('publicSite.includeInIndex', true);
  }
}
