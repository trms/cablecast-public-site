import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		var appParams = this.paramsFor('application');
		var recentPrograms = this.store.find('show', {
				pageSize: 50,
			});
		var thumbnails = recentPrograms.then(function(programs) {
			return Ember.RSVP.all(programs.map(function(program) {
				return program.get('showFile');
			}));
		})
		return Ember.RSVP.hash({
			channel: this.store.find('channel', appParams.channel),
			recentPrograms: recentPrograms,
			thumbnails: thumbnails
		});
	},
	actions: {
		schedule: function(params) {
			this.transitionTo('schedule', params.id)
		}
	}	
});
