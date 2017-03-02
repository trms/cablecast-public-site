import Ember from 'ember';
import ENV from 'public/config/environment';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  queryParams: {
    channel: {
      refreshModel: true
    }
  },

  getAUrl(publicSite) {
    let pattern = /^https?:\/\/.*/i;
    let url = pattern.exec(publicSite.get('facebookUrl')) || pattern.exec(publicSite.get('twitter')) || pattern.exec(publicSite.get('blogUrl'));
    return url && url[0] || null;
  },

  setHeadData(channel) {
    let headData = this.get('headData');
    headData.set('channelID', channel.get('id'));
    headData.set('rootURL', ENV.rootURL);

    let publicSite = channel.get('publicSite');
    let data = {
      card: 'summary',
      title: publicSite.get('siteName'),
      description: publicSite.get('aboutPageDescription'),
      image: publicSite.get('logo.url'),
      url: this.getAUrl(publicSite)
    };
    headData.set('socialMedia', data);
  },

  model: function(params) {
    // TODO enable sideloading of publicsite
    return Ember.RSVP.hash({
      channels: this.get('store').query('channel', {include: 'publicsite,webfile'}),
      publicSites: this.get('store').findAll('public-site')
    })
    .then((result) => {
      let channel = result.channels.findBy('id', params.channel + '');
      if (!channel) {
        channel = result.channels.get('firstObject');
      }
      let logoId = channel.get('publicSite.logo.id');
      return Ember.RSVP.hash({
        channel:channel,
        logo:this.get('store').findRecord('web-file', logoId)
      });
    })
    .then((results) => {
      let channel = results.channel;
      this.setHeadData(channel);

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
