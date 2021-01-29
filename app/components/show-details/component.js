/* globals moment */
import { computed } from '@ember/object';

import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  site: service(),
  orderedFields: computed('site.publicSite.fieldDisplays.@each.order', function() {
    return this.get('site.publicSite.fieldDisplays').sortBy('order');
  }),
  firstRun: computed('show','currentChannelId',function(){
    let currentChannelId = this.get('currentChannelId');
    let firstRun = this.get('show.firstRuns').filterBy('channel.id',currentChannelId).get('firstObject');
    return firstRun;
  }),

  firstRunIsFuture: computed('firstRun.runDateTime',function(){
    let runDateTime = this.get('firstRun.runDateTime');
    let now = moment();
    return now.isBefore(runDateTime);
  }),

});