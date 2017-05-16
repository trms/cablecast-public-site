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
    if (!search) { return; }
    let limit = this.get('gallery.displayLimit') * 3;
    let showIds = search.get('results').slice(0,limit);

    if(showIds.length === 0){
      return;
    }

    let shows = this.get('store')
      .query('show',{
        ids: showIds,
        include: 'thumbnail,vod,category,project,producer,reel',
        page_size: limit
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