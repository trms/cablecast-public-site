import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return this.store.find('channel')
    .then(function(channels) {
      var channel = channels.findBy('id', params.channel + '');
      if (!channel) {
        return channels.get('firstObject');
      } else {
        return channel;
      }
    });
  }
});
