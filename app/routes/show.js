import classic from 'ember-classic-decorator';
import { hash, all } from 'rsvp';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import fetch from 'fetch';
import ENV from 'cablecast-public-site/config/environment';

@classic
export default class ShowRoute extends Route {
  @service headData;

  setHeadData(show) {
    let data = {
      type: 'video.episode',
      card: 'summary_large_image',
      description: show.description || show.title,
      image: show.thumbnail
    };
    let headData = this.headData;
    headData.set('socialMedia', data);

    this.appendJsonLD(data, show);
  }

  findAThumbnailUrl(show) {
    let thumbnail = show.get('showThumbnails').findBy('quality', 'Large');
    if (!thumbnail) {
      thumbnail = show.get('showThumbnails.firstObject');
    }
    if (thumbnail) {
      return encodeURI(thumbnail.get('url'));
    }
    return this.get('headData.socialMedia.image');
  }

  appendJsonLD(data, show) {
    let jsonLD = {
      '@context': 'http://schema.org',
      '@type': 'TVClip',
    };
    if (data.image) {
      jsonLD.thumbnailUrl = data.image;
    }
    // TODO date
    // let eventDate = show.get('eventDateString');
    // if (eventDate) {
    //   jsonLD.datePublished = eventDate;
    // }
    if (data.title) {
      jsonLD.headline = data.title;
    }
    let headData = this.headData;
    headData.set('jsonLD', JSON.stringify(jsonLD));
  }

  async model(params) {
    let host = params.host || 'watch.pittsfield.org';
    let base = "https://cablecast-cloud-pr-120.herokuapp.com";
    if (ENV.environment === 'development') {
      base = "http://localhost:5000";
    }
    let result = await fetch(`${base}/api/publicsitedata/shows/${params.id}?host=${host}`);
    let json = await result.json();
    
    return json;
  }

  afterModel(model) {
    this.setHeadData(model);
  }

  resetController(controller) {
    controller.set('activeTab', 'details');
    controller.set('seekto', null);
  }
}
