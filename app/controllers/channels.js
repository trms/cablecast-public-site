import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({

  allChannels: computed(function(){
    return this.store.peekAll('channel');
  }),

  publicChannels: computed('allChannels.[]',function(){
    return this.get('allChannels').filterBy('publicSite.includeInIndex',true);
  }),
});