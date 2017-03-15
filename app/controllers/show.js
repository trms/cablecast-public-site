import Ember from 'ember';

export default Ember.Controller.extend({
  activeTab: 'details',
  application: Ember.inject.controller(),

  show: Ember.computed.alias('model.show'),
  runs: Ember.computed.alias('model.runs'),

  currentChannelId: Ember.computed.alias('application.channel'),

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
