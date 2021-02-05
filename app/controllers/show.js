import { computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({
  site: service(),
  activeTab: 'details',
  application: controller(),

  show: alias('model.show'),
  runs: alias('model.runs'),

  currentChannelId: alias('application.channel'),

  vodChapters: computed('model.show.vods.firstObject.{chapters.@each.deleted,chaptersPublished}', function() {
    if (!this.get('model.show.vods.firstObject.chaptersPublished')) {
      return [];
    }
    let chapters =  this.get('model.show.vods.firstObject.chapters') || [];
    return chapters.rejectBy('deleted').rejectBy('quickAdded').sortBy('offset');
  }),

  queryParams: ['seekto'],
  seekto: null,

  //TODO - fix this code later
  embededPdf: computed('model.show.customFields', 'site.publicSite.fieldDisplays.[]', function() {
    let pdfDisplays = this.get('site.publicSite.fieldDisplays').sortBy('order').filterBy('widget', 'pdf');
    for (let i = 0; i < pdfDisplays.length; i++) {
      let fd = pdfDisplays[i];
      let fileField = this.get('model.show.customFields').find((field) => {
        return field.type === 'file' && fd.get('showField') === field.showField;
      });
      if (fileField && fileField.value) {
        let file = this.get('store').peekRecord('web-file', fileField.value);
        if (/.+\.pdf$/.test(file.get('name'))) {
          return {
            url: get(file || {}, 'url'),
            fieldDisplay: pdfDisplays[i]
          };
        }
      }
    }
  }),

	actions: {
		showChapters: function() {
      this.set('activeTab', 'chapters');
		},
		showDetails: function() {
			this.set('activeTab', 'details');
		},
    setSeekTo: function(chapterId) {
      this.set('seekto', chapterId);
    }
	}
});
