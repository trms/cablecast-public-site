import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';

import Component from '@ember/component';

@classic
@tagName('')
export default class ShowDetails extends Component {
  @service
  site;

  @computed('site.publicSite.fieldDisplays.@each.order')
  get orderedFields() {
    // FIXME
    return [];
    //return this.get('site.publicSite.fieldDisplays').sortBy('order');
  }

  @computed('currentChannelId', 'show.firstRuns')
  get firstRun() {
    let currentChannelId = this.currentChannelId;
    let firstRun = this.get('show.firstRuns')
      .filterBy('channel.id', currentChannelId)
      .get('firstObject');
    return firstRun;
  }

  @computed('firstRun.runDateTime')
  get firstRunIsFuture() {
    let runDateTime = this.get('firstRun.runDateTime');
    let now = moment();
    return now.isBefore(runDateTime);
  }
}
