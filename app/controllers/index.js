import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';

@classic
export default class IndexController extends Controller {
  @controller
  application;

  @alias('application.model.channel')
  channel;

  @computed('model.{carouselShows.[],defaultShows.[]}')
  get carouselShows() {

    if(this.get('model.carouselShows.length')){
      return this.get('model.carouselShows');
    }
    return this.get('model.defaultShows');
  }

  @computed('channel.publicSite.siteGalleries.@each.position')
  get siteGalleries() {
    return this.get('channel.publicSite.siteGalleries').sortBy('position');
  }
}