import Ember from 'ember';
import ENV from 'public/config/environment';
import ResetScroll from 'public/mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll,{
  fastboot: Ember.inject.service(),
  headData: Ember.inject.service(),

  queryParams: {
    channel: {
      refreshModel: true
    }
  },

  setHeadData(channel) {
    let fastboot = this.get('fastboot');
    let headData = this.get('headData');
    let url = 'foo';
    headData.set('channelID', channel.get('id'));
    headData.set('rootURL', encodeURI(ENV.rootURL));

    if (fastboot.get('isFastBoot')) {
      let protocol = fastboot.get('request.protocol');
      let host = fastboot.get('request.host');
      let path = fastboot.get('request.path');
      url = `${protocol}://${host}${path}`;
    } else {
      url = document.location.href;
    }

    let publicSite = channel.get('publicSite');
    let data = {
      type: 'website',
      card: 'summary',
      title: publicSite.get('siteName'),
      description: publicSite.get('aboutPageDescription'),
      image: encodeURI(publicSite.get('squareLogo.url'))
    };
    headData.set('url', encodeURI(url));
    headData.set('socialMedia', data);
  },

  model: function(params) {
    return Ember.RSVP.hash({
      channels: this.get('store').query('channel', {include: 'publicsite,webfile,thumbnail,sitegallery,savedshowsearch'}),
      projects: this.get('store').findAll('project')
    })
    .then((result) => {
      let channels = result.channels;
      let channel = channels.findBy('id', params.channel + '');
      if (!channel) {
        channel = channels.get('firstObject');
      }
      this.setHeadData(channel);
      return {
        channel: channel,
        projects: result.projects
      };
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('channel', model.channel.id);
  }
});
