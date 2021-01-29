import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  headData: Ember.inject.service(),
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: Ember.inject.service(),
  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      let page = this.get('url');
      let title = document.title;
      Ember.get(this, 'metrics').trackPage({ page, title });
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
