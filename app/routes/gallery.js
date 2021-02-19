import classic from 'ember-classic-decorator';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import ResetScroll from 'cablecast-public-site/mixins/reset-scroll';

@classic
export default class GalleryRoute extends Route.extend(ResetScroll) {
  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  model(params) {
    let gallery = this.store.findRecord('site-gallery', params.id);
    let shows = gallery.then((gallery) => {
      let pageSize = 50;
      let start = (params.page - 1) * pageSize;
      let end = start + pageSize;
      let ids = gallery.get('savedShowSearch.results').slice(start, end);
      return this.store.query('show', {
        ids: ids,
        include: 'thumbnail,vod,category,project,producer,reel',
      });
    });

    return hash({
      gallery,
      shows,
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('model', model);
  }

  deactivate() {
    super.deactivate(...arguments);
    this.controller.set('page', 1);
  }
}
