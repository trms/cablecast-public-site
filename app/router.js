import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import EmberRouter from '@ember/routing/router';
import config from './config/environment';

@classic
class Router extends EmberRouter {
  @service
  fastboot;

  @service
  headData;

  location = config.locationType;
  rootURL = config.rootURL;

  @service
  metrics;

  init() {
    super.init(...arguments);
    this.on('routeDidChange', () => {
      this._trackPage();
    });
  }

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      if (!this.get('fastboot.isFastBoot')) {
        let page = this.url;
        let title = document.title;
        this.metrics.trackPage({ page, title });
      }
    });
  }
}

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
