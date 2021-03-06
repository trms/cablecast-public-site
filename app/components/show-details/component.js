/* globals moment */
import Ember from 'ember';

export default Ember.Component.extend({
  site: Ember.inject.service(),
  orderedFields: Ember.computed('site.publicSite.fieldDisplays.@each.order', function() {
    return this.get('site.publicSite.fieldDisplays').sortBy('order');
  }),
  firstRun: Ember.computed('show','currentChannelId',function(){
    let currentChannelId = this.get('currentChannelId');
    let firstRun = this.get('show.firstRuns').filterBy('channel.id',currentChannelId).get('firstObject');
    return firstRun;
  }),

  firstRunIsFuture: Ember.computed('firstRun.runDateTime',function(){
    let runDateTime = this.get('firstRun.runDateTime');
    let now = moment();
    return now.isBefore(runDateTime);
  }),

});