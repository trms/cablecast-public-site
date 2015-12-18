import Ember from 'ember';

export default Ember.Controller.extend({
	showingChapters: false,
	showingDetails: true,

  show: Ember.computed.alias('model.show'),
  runs: Ember.computed.alias('model.runs'),

	actions: {
		showChapters: function(){
			this.set('showingDetails', false);
			this.set('showingChapters', true);
		},
		showDetails: function() {
			this.set('showingDetails', true);
			this.set('showingChapters', false);
		}
	}
});
