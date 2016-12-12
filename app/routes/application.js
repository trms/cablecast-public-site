import Ember from 'ember';
import ENV from 'public/config/environment';




export default Ember.Route.extend({
  queryParams: {
    channel: {
      refreshModel: true
    }
  },

  fastboot: Ember.inject.service(),
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),

  model: function(params){
    return Ember.RSVP.hash({
      channels: this.store.findAll('channel'),
      publicSites: this.store.findAll('public-site').then((sites) => {
        return Ember.RSVP.all(sites.map(s => s.get('logo')));
      })
    })
    .then(({channels}) => {
      var channel = channels.findBy('id', params.channel + '');
      if (!channel && this.get('isFastBoot')) {
        return channels.get('firstObject');
      } else if (!channel) {
        this.transitionTo({queryParams: {channel: channels.get('firstObject.id')}});
      }

      return channel;
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('channel',model.get('id'));
  }

});
