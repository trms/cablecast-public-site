import Ember from 'ember';

export default Ember.Controller.extend({
  site: Ember.inject.service(),
  activeTab: 'details',
  application: Ember.inject.controller(),

  show: Ember.computed.alias('model.show'),
  runs: Ember.computed.alias('model.runs'),

  currentChannelId: Ember.computed.alias('application.channel'),

  vodChapters: Ember.computed('model.show.vods.firstObject.chapters.@each.deleted', 'model.show.vods.firstObject.chaptersPublished', function() {
    if (!this.get('model.show.vods.firstObject.chaptersPublished')) {
      return [];
    }
    let chapters =  this.get('model.show.vods.firstObject.chapters') || [];
    return chapters.rejectBy('deleted').sortBy('offset');
  }),

  queryParams: ['seekto'],
  seekto: null,

  embededPdf: Ember.computed('model.show.customFields', 'site.publicSite.fieldDisplays.[]', function() {
    let pdfDisplays = this.get('site.publicSite.fieldDisplays').sortBy('order').filterBy('widget', 'pdf');
    for (let i = 0; i < pdfDisplays.length; i++) {
      let fd = pdfDisplays[i];
      let fileField = this.get('model.show.customFields').find((field) => {
        return field.type === 'file' && fd.get('showField') === field.showField;
      });
      if (fileField) {
        let file = this.get('store').peekRecord('web-file', fileField.value);
        if (/.+\.pdf$/.test(file.get('name'))) {
          return {
            url: Ember.get(file || {}, 'url'),
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
