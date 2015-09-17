import Ember from 'ember';
import ENV from 'public/config/environment';

function loadColorCss(channelId) {
  if (ENV.environment !== 'development'){
    return new Ember.RSVP.Promise(function(resolve) {
      var link    = document.createElement('link');
      link.rel = 'stylesheet';
      link.href    = '/Cablecast/public-site/colors-' + channelId + '.css?t=' + Date.now();
      link.onload = function() { resolve(); };
      link.onerror = function() { resolve(); };
      document.getElementsByTagName('head')[0].appendChild(link);
    });
  } else {
    return Ember.RSVP.resolve();
  }
}

function loadCustomCss(channelId) {
  if (ENV.environment !== 'development'){
    return new Ember.RSVP.Promise(function(resolve) {
      var link    = document.createElement('link');
      link.rel = 'stylesheet';
      link.href    = '/Cablecast/public-site/custom-' + channelId + '.css?t=' + Date.now();
      link.onload = function() { resolve(); };
      link.onerror = function() { resolve(); };
      document.getElementsByTagName('head')[0].appendChild(link);
    });
  } else {
    return Ember.RSVP.resolve();
  }
}



export default Ember.Route.extend({
  queryParams: {
    channel: {
      refreshModel: true
    }
  },

  model: function(params){
    var self = this;
    return this.store.find('channel')
    .then(function(channels) {
      var channel = channels.findBy('id', params.channel + '');
      if (!channel) {
        self.transitionTo({queryParams: {channel: channels.get('firstObject.id')}});
      } else {
        var channelId = channel.get('id');
        return Ember.RSVP.all([loadColorCss(channelId), loadCustomCss(channelId)]).
          then(function() {
            return channel;
          });
      }
    });
  }
});
