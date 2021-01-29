import { get } from '@ember/object';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ENV from 'public/config/environment';
import ResetScroll from 'public/mixins/reset-scroll';

export default Route.extend(ResetScroll,{
  site: service(),
  fastboot: service(),
  headData: service(),
  metrics: service(),

  queryParams: {
    channel: {
      refreshModel: true
    }
  },

  getCanonicalUrl() {
    let url = '';
    let fastboot = this.get('fastboot');

    if (fastboot.get('isFastBoot')) {
      let protocol = fastboot.get('request.protocol');
      let host = fastboot.get('request.host');
      let path = fastboot.get('request.path');
      url = `${protocol}//${host}${path}`;
    } else {
      url = document.location.href;
    }
    return url;
  },

  appendJsonLD(publicSite) {
    let pageUrl = this.getCanonicalUrl();
    let jsonLD = {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: encodeURI(pageUrl)
    };
    let logo = publicSite.get('squareLogo.content') || publicSite.get('logo.content');
    if (logo) {
      jsonLD.thumbnailUrl = encodeURI(logo.get('url'));
    }
    let about = publicSite.get('aboutPageShortDescription') || publicSite.get('aboutPageDescription');
    if (about) {
      jsonLD.about = about;
    }
    let headline = publicSite.get('siteName');
    if (headline) {
      jsonLD.headline = headline;
    }
    let headData = this.get('headData');
		headData.set('jsonLD', JSON.stringify(jsonLD));
  },

  setHeadData(channel) {
    let publicSite = channel.get('publicSite');
    let data = {
      type: 'website',
      card: 'summary',
      title: publicSite.get('siteName'),
      description: publicSite.get('aboutPageDescription')
    };
    let logo = publicSite.get('squareLogo.content') || publicSite.get('logo.content');
    if (logo) {
      data.image = encodeURI(logo.get('url'));
    }
    let headData = this.get('headData');
    headData.set('socialMedia', data);

    this.appendJsonLD(publicSite);

    let url = this.getCanonicalUrl();
    headData.set('url', encodeURI(url));
    headData.set('channelID', channel.get('id'));
    headData.set('rootURL', encodeURI(ENV.rootURL));
  },

  model: function(params) {
    return hash({
      channels: this.get('store').query('channel', {include: 'publicsite,webfile,thumbnail,sitegallery,savedshowsearch'}),
      projects: this.get('store').findAll('project')
    })
    .then((result) => {
      let channels = result.channels;
      let channel = channels.findBy('id', params.channel + '');
      if (!channel) {
        channel = channels.get('firstObject');
      }
      return {
        channel: channel,
        projects: result.projects
      };
    });
  },

  afterModel(model) {
    let publicSite = model.channel.get('publicSite');
    this.set('site.publicSite', publicSite);
    this.setHeadData(model.channel);
    this._setupMetrics(publicSite);
  },

  _setupMetrics(site) {
    if (get(site, 'googleAnalyticsId')) {
      let metrics = get(this, 'metrics');
      let id = get(site, 'googleAnalyticsId');

      metrics.activateAdapters([
        {
          name: 'GoogleAnalytics',
          environments: ['all'],
          config: {
            id
          }
        }
      ]);
    }
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('channel', model.channel.id);
  }
});
