import Ember from 'ember';

export default Ember.Controller.extend({

  allChannels: Ember.computed(function(){
    return this.store.peekAll('channel');
  }),

  publicChannels: Ember.computed('allChannels.[]',function(){
    return this.get('allChannels').filterBy('publicSite.includeInIndex',true);
  }),
});