import Ember from 'ember';
import {task} from 'ember-concurrency';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  classNames: ['shows-gallery'],

  init(){
    this._super(...arguments);
    this.get('showsTask').perform();
  },

  collapsed:false,

  showsTask: task(function * (){
    let search = this.get('gallery.savedShowSearch');
    if(!search){
      return;
    }
    let limit = this.get('gallery.displayLimit') * 3;
    let store = this.get('store');
    let shows = store.query('show',{
                  ids: this.get('gallery.savedShowSearch.results').slice(0,limit),
                  include: 'thumbnail,vod,category,project,producer,reel',
                });

    yield shows;
    this.set('shows',shows);
  }),

  filteredShows: Ember.computed('shows.[]',function(){
    let shows = this.get('shows') || [];
    let limit = this.get('gallery.displayLimit');
    return shows.filterBy('showThumbnails.length').splice(0,limit);
  }),
  actions:{
    collapseGallery(){
      this.toggleProperty('collapsed');
    }
  }
});