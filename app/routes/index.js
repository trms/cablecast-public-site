import Ember from 'ember';
import SetPageTitle from 'public/mixins/set-page-title';

export default Ember.Route.extend(SetPageTitle, {

	model() {
		let channel = this.modelFor('application').channel;

    let carouselShows = channel.get('publicSite.carouselSavedSearch').then((search)=>{
      if(search){
        return this.store.query('show',{
          ids: search.get('results').slice(0,20),
          include: 'thumbnail,vod,category,project,producer,reel',
        });
      }
    });

    return Ember.RSVP.hash({
      carouselShows,
      defaultShows: this.store.query('show',{page_size: 24, location: channel.get('primaryLocation')}),
      categories: this.store.findAll('category'),
      projects: this.store.findAll('project'),
      producers: this.store.findAll('producer')
    });
  },

  afterModel() {
    var channel = this.modelFor('application').channel;
    this.setTitle(channel.get('name'));
  }
});
