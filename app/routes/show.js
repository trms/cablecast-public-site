import classic from 'ember-classic-decorator';
import { hash, all } from 'rsvp';
import Route from '@ember/routing/route';
import SetPageTitle from 'cablecast-public-site/mixins/set-page-title';

@classic
export default class ShowRoute extends Route.extend(SetPageTitle) {
  setHeadData(show) {
    let data = {
      type: 'video.episode',
      card: 'summary_large_image',
      title: show.get('cgTitle'),
      description: show.get('comments') || show.get('cgTitle')
    };
    let thumbnailUrl = this.findAThumbnailUrl(show);
    if (thumbnailUrl) {
      data.image = thumbnailUrl;
    }
    let headData = this.headData;
    headData.set('socialMedia', data);

    this.appendJsonLD(data, show);

    this.setTitle(show.get('cgTitle'));
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
      "@context": "http://schema.org",
      "@type": "TVClip"
    };
    if (data.image) {
      jsonLD.thumbnailUrl = data.image;
    }
    let eventDate = show.get('eventDateString');
    if (eventDate) {
      jsonLD.datePublished = eventDate;
    }
    if (data.title) {
      jsonLD.headline = data.title;
    }
    let headData = this.headData;
    headData.set('jsonLD', JSON.stringify(jsonLD));
  }

  model(params) {
    var appParams = this.paramsFor('application');
    var start = new Date();
    var self = this;
    return hash({
      shows: this.store.query('show', {
        ids: [params.id],
        include: 'vod,vodtransaction,scheduleitem,thumbnail,chapter,firstrun,producer'
      }),
      runs: this.store.query('schedule-item', {
        show: params.id,
        start: start.toISOString(),
        page_size: 5,
        channel: appParams.channel
      }),
      channels: this.store.findAll('channel')
    })
      .then(({ runs }) => {
        let show = self.store.peekRecord('show', params.id);
        return hash({
          show: show,
          runs: runs
        });
      });
  }

  afterModel(model) {
    this.setHeadData(model.show);
    return this.loadCustomFieldRecords(model.show);
  }

  loadCustomFieldRecords(show) {
    let records = [];
    show.get('customFields').forEach((field) => {
      if (field.type === 'file' && field.value) {
        records.push(this.store.findRecord('web-file', field.value));
      } else if (field.type === 'producer' && field.value) {
        records.push(this.store.findRecord('producer', field.value));
      }
    });
    return all(records);
  }

  setupController(controller, model) {
    let chapters = model.show.get('vods.firstObject.chapters') || [];
    chapters = chapters.rejectBy('deleted');
    if (chapters.length) {
      controller.set('activeTab', 'chapters');
    }
    controller.set('model', model);
  }

  resetController(controller) {
    controller.set('activeTab', 'details');
    controller.set('seekto', null);
  }
}
