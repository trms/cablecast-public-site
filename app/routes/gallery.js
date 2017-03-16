import Ember from 'ember';

export default Ember.Route.extend({
  fastboot: Ember.inject.service(),

  queryParams: {
		page: {
			refreshModel: true
		}
	},
  model(params){
    let gallery = this.store.findRecord('site-gallery',params.id);
    let shows = gallery.then((gallery)=>{
    return this.store.query('show',{
                              offset: params.page - 1,
                              ids: gallery.get('savedShowSearch.results'),
                              include: 'thumbnail,vod,category,project,producer,reel',
                            });
    });

    return Ember.RSVP.hash({
      gallery,
      shows,
    });
  },

  setupController(controller, model){
		this._super(...arguments);
    controller.set('model',model);
    if(this.get('fastboot.isFastBoot') === false){
      window.scrollTo(0,0);
    }
	},
  deactivate(){
    this._super(...arguments);
    this.controller.set('page',1);
  },
});
