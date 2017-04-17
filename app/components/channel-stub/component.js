import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['channel-stub'],

  siteName: Ember.computed('channel.publicSite.siteName','channel.name',function(){
    return this.get('channel.publicSite.siteName') || this.get('channel.name');
  }),

  logo: Ember.computed('channel.publicSite.{logo,squareLogo}',function(){
    return this.get('channel.publicSite.squareLogo.url') || this.get('channel.publicSite.logo.url');
  }),
});
