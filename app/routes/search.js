import Ember from 'ember';

export default Ember.Route.extend({
	queryParams: {
		query: {
			refreshModel: true
		},
		page: {
			refreshModel: true
		}
	},
	model: function(params) {
		var channel = this.modelFor('application');
		return this.store.find('show', {
			offset: params.page - 1,
			search: params.query,
			location: channel.get('primaryLocation')
		});
	},

	setupController: function(controller, model){
		controller.set('model', model);
		controller.set('tempQuery', this.paramsFor(this.routeName).query);
		window.scrollTo(0,0);
	}
});
