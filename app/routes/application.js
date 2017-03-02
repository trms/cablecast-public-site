import Ember from 'ember';
import ENV from 'public/config/environment';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  queryParams: {
    channel: {
      refreshModel: true
    }
  },

  model: function(params) {
    let headData = this.get('headData');

    // TODO enable sideloading of publicsite
    return Ember.RSVP.hash({
      channels: this.get('store').query('channel', {include: 'publicsite'}),
      publicSites: this.get('store').findAll('public-site')
    })
    .then((result) => {
      let channel = result.channels.findBy('id', params.channel + '');
      if (!channel) {
        channel = result.channels.get('firstObject');
      }
      return channel;
    })
    .then((channel) => {
      headData.set('channelID', channel.get('id'));
      headData.set('rootURL', ENV.rootURL);

      return Ember.RSVP.hash({
        logo: channel.get('publicSite.logo'),
        channel: channel,
        projects: this.store.query('project', {location: channel.primaryLocation.id})
      });
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('channel', model.channel.id);
  }

});
