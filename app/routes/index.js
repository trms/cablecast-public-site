import Ember from 'ember';


export default Ember.Route.extend({

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
  }
});
