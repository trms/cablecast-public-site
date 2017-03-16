import Ember from 'ember';

export default Ember.Controller.extend({

  application: Ember.inject.controller(),

  channel: Ember.computed.alias('application.model.channel'),

  carouselShows: Ember.computed('model.carouselShows.[]', 'model.defaultShows.[]',function(){

    if(this.get('model.carouselShows.length')){
      return this.get('model.carouselShows');
    }
    return this.get('model.defaultShows');
  }),
  siteGalleries: Ember.computed('channel.publicSite.siteGalleries.@each.position',function(){
    return this.get('channel.publicSite.siteGalleries').sortBy('position');
  }),
});