import Ember from 'ember';

export default Ember.Controller.extend({
  activeTab: 'details',

  show: Ember.computed.alias('model.show'),
  runs: Ember.computed.alias('model.runs'),

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
