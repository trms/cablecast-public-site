import Ember from 'ember';
import ResetScroll from 'public/mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
  queryParams: {
		page: {
			refreshModel: true
		}
	},
  model(params){
    let gallery = this.store.findRecord('site-gallery',params.id);
    let shows = gallery.then((gallery) => {
      let pageSize = 50;
      let offset = (params.page - 1) * pageSize;
      let ids = gallery.get('savedShowSearch.results').slice(offset, pageSize);
      return this.store.query('show',{
                                offset: params.page - 1,
                                ids: ids,
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
	},
  deactivate(){
    this._super(...arguments);
    this.controller.set('page',1);
  },
});
