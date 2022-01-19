import EmberRouter from '@ember/routing/router';
import config from 'cablecast-public-site/config/environment';

class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('podcasts');
  this.route('schedule');
  this.route('show', { path: 'show/:id' });
  this.route('watch-now');
  this.route('vods');
  this.route('search');
  this.route('gallery', { path: 'gallery/:id' });
});

export default Router;
