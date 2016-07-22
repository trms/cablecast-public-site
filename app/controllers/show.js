import Ember from 'ember';

export default Ember.Controller.extend({
  activeTab: 'details',

  show: Ember.computed.alias('model.show'),
  chapters: Ember.computed('show.vods.firstObject.chapters.[]', function(){
    return this.get('show.vods.firstObject.chapters').filterBy('deleted', false);
  }),
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
