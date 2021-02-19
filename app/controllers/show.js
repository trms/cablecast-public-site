import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { get, action, computed } from '@ember/object';
import Controller, { inject as controller } from '@ember/controller';

@classic
export default class ShowController extends Controller {
  @service
  site;

  activeTab = 'details';

  @controller
  application;

  @alias('model.show')
  show;

  @alias('model.runs')
  runs;

  @alias('application.channel')
  currentChannelId;

  @computed(
    'model.show.vods.firstObject.{chapters.@each.deleted,chaptersPublished}'
  )
  get vodChapters() {
    if (!this.get('model.show.vods.firstObject.chaptersPublished')) {
      return [];
    }
    let chapters = this.get('model.show.vods.firstObject.chapters') || [];
    return chapters.rejectBy('deleted').rejectBy('quickAdded').sortBy('offset');
  }

  queryParams = ['seekto'];
  seekto = null;

  //TODO - fix this code later
  @computed('model.show.customFields', 'site.publicSite.fieldDisplays.[]')
  get embededPdf() {
    let pdfDisplays = this.get('site.publicSite.fieldDisplays')
      .sortBy('order')
      .filterBy('widget', 'pdf');
    for (let i = 0; i < pdfDisplays.length; i++) {
      let fd = pdfDisplays[i];
      let fileField = this.get('model.show.customFields').find((field) => {
        return field.type === 'file' && fd.get('showField') === field.showField;
      });
      if (fileField && fileField.value) {
        let file = this.store.peekRecord('web-file', fileField.value);
        if (/.+\.pdf$/.test(file.get('name'))) {
          return {
            url: get(file || {}, 'url'),
            fieldDisplay: pdfDisplays[i],
          };
        }
      }
    }
  }

  @action
  showChapters() {
    this.set('activeTab', 'chapters');
  }

  @action
  showDetails() {
    this.set('activeTab', 'details');
  }

  @action
  setSeekTo(chapterId) {
    this.set('seekto', chapterId);
  }
}
