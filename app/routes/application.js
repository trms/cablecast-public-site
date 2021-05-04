import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import ENV from 'cablecast-public-site/config/environment';

export default class ApplicationRoute extends Route {
  @service
  site;

  @service
  fastboot;

  @service
  headData;

  @service
  metrics;

  @service
  router;

  queryParams = {
    channel: {
      refreshModel: true,
    },
  };

  constructor() {
    super(...arguments);
    let router = this.router;
    router.on('routeDidChange', () => {
      if (!this.fastboot.isFastBoot) {
        let page = router.currentURL;
        let title = document.title;

        this.metrics.trackPage({ page, title });
      }
    });
  }

  getCanonicalUrl() {
    let url = '';
    let fastboot = this.fastboot;

    if (fastboot.get('isFastBoot')) {
      let protocol = fastboot.get('request.protocol');
      let host = fastboot.get('request.host');
      let path = fastboot.get('request.path');
      url = `${protocol}//${host}${path}`;
    } else {
      url = document.location.href;
    }
    return url;
  }

  appendJsonLD(publicSite) {
    let pageUrl = this.getCanonicalUrl();
    let jsonLD = {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: encodeURI(pageUrl),
    };
    let logo =
      publicSite.get('squareLogo.content') || publicSite.get('logo.content');
    if (logo) {
      jsonLD.thumbnailUrl = encodeURI(logo.get('url'));
    }
    let about =
      publicSite.get('aboutPageShortDescription') ||
      publicSite.get('aboutPageDescription');
    if (about) {
      jsonLD.about = about;
    }
    let headline = publicSite.get('siteName');
    if (headline) {
      jsonLD.headline = headline;
    }
    let headData = this.headData;
    headData.set('jsonLD', JSON.stringify(jsonLD));
  }

  setHeadData(channel) {
    let publicSite = channel.get('publicSite');
    let data = {
      type: 'website',
      card: 'summary',
      title: publicSite.get('siteName'),
      description: publicSite.get('aboutPageDescription'),
    };
    let logo =
      publicSite.get('squareLogo.content') || publicSite.get('logo.content');
    if (logo) {
      data.image = encodeURI(logo.get('url'));
    }
    let headData = this.headData;
    headData.set('socialMedia', data);

    this.appendJsonLD(publicSite);

    let url = this.getCanonicalUrl();
    headData.set('url', encodeURI(url));
    headData.set('channelID', channel.get('id'));
    headData.set('rootURL', encodeURI(ENV.rootURL));
  }

  model(params) {
    return hash({
      channels: this.store.query('channel', {
        include: 'publicsite,webfile,thumbnail,sitegallery,savedshowsearch',
      }),
      projects: this.store.findAll('project'),
    }).then((result) => {
      let channels = result.channels;
      let channel = channels.findBy('id', params.channel + '');
      if (!channel) {
        channel = channels.get('firstObject');
      }
      return {
        channel: channel,
        projects: result.projects,
        pageTitle: channel.get('publicSite.siteName') || channel.get('name'),
      };
    });
  }

  afterModel(model) {
    let publicSite = model.channel.get('publicSite');
    this.site.publicSite = publicSite;
    this.setHeadData(model.channel);
    this._setupMetrics(publicSite);
  }

  _setupMetrics(site) {
    if (site.googleAnalyticsId) {
      let metrics = this.metrics;
      let id = site.googleAnalyticsId;

      metrics.activateAdapters([
        {
          name: 'GoogleAnalytics',
          environments: ['production'],
          config: {
            id,
          },
        },
        {
          name: 'ConsoleAdapter',
          environments: ['development'],
        },
      ]);
    }
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('channel', model.channel.id);
  }
}
