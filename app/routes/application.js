import Ember from 'ember';
import ENV from 'public/config/environment';




export default Ember.Route.extend({
  queryParams: {
    channel: {
      refreshModel: true
    }
  },

  model: function(params){
    var self = this;
    return this.store.findAll('channel')
    .then(function(channels) {
      var channel = channels.findBy('id', params.channel + '');
      if (!channel) {
        self.transitionTo({queryParams: {channel: channels.get('firstObject.id')}});
      }
      return channel;
    });
  }
});
