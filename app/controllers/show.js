import Ember from 'ember';

export default Ember.Controller.extend({
  activeTab: 'details',
  application: Ember.inject.controller(),

  show: Ember.computed.alias('model.show'),
  runs: Ember.computed.alias('model.runs'),

  currentChannelId: Ember.computed.alias('application.channel'),

  vodChapters: Ember.computed('model.show.vods.firstObject.chapters.@each.deleted', function() {
    return this.get('model.show.vods.firstObject.chapters').rejectBy('deleted').sortBy('offset');
  }),

  queryParams: ['seekto'],
  seekto: null,

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
