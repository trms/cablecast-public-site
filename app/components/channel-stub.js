import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['channel-stub','col-xs-12', 'col-sm-4', 'col-md-3'],

  siteName: Ember.computed('channel.publicSite.siteName','channel.name',function(){
    return this.get('channel.publicSite.siteName') || this.get('channel.name');
  }),

});
