import { get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import EmberRouter from '@ember/routing/router';
import config from './config/environment';  


const Router = EmberRouter.extend({
  fastboot: service(),
  headData: service(),
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: service(),

  init() {
    this._super(...arguments);
    this.on('routeDidChange', () => {
      this._trackPage();
    });
  },

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      if (this.get('fastboot.isFastboot')) {
        let page = this.get('url');
        let title = document.title;
        get(this, 'metrics').trackPage({ page, title });
      }
    });
  }
});

Router.map(function() {
  this.route('podcasts');
  this.route('schedule');
  this.route('show', {path: 'show/:id'});
  this.route('watch-now', { path:'watch/:stream_id' });
  this.route('vods');
  this.route('search');
  this.route('gallery',{path: 'gallery/:id'});
});

export default Router;
