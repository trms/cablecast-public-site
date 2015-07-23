import Ember from 'ember';

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
        self.transitionTo({queryParams: {channel: channels.get('firstObject.id')}})
      } else {
        return channel;
      }
    });
  }
});
