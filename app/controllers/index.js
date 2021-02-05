import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({

  application: controller(),

  channel: alias('application.model.channel'),

  carouselShows: computed('model.{carouselShows.[],defaultShows.[]}',function(){

    if(this.get('model.carouselShows.length')){
      return this.get('model.carouselShows');
    }
    return this.get('model.defaultShows');
  }),
  siteGalleries: computed('channel.publicSite.siteGalleries.@each.position',function(){
    return this.get('channel.publicSite.siteGalleries').sortBy('position');
  }),
});