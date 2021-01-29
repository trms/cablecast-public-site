import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import ResetScroll from 'public/mixins/reset-scroll';

export default Route.extend(ResetScroll, {
  queryParams: {
		page: {
			refreshModel: true
		}
	},
  model(params){
    let gallery = this.store.findRecord('site-gallery',params.id);
    let shows = gallery.then((gallery) => {
      let pageSize = 50;
      let start = (params.page - 1) * pageSize;
      let end = start + pageSize;
      let ids = gallery.get('savedShowSearch.results').slice(start, end);
      return this.store.query('show',{
                                ids: ids,
                                include: 'thumbnail,vod,category,project,producer,reel',
                              });
    });

    return hash({
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
