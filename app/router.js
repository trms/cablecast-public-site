import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('schedule');
  this.resource('show', {path: 'show/:id'});

  this.resource('channel');

  this.resource('watch', { path:'watch/:stream_id' });

  this.route('choose');
  this.route('vods');
  this.route('search');
});

export default Router;
