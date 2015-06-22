import Ember from 'ember'

export default Ember.Route.extend({
	queryParams: {
		query: {
			refreshModel: true
		}
	},
	model: function(params) {
		return this.store.find('show', {search: params.query});
	},

	setupController: function(controller, model){
		controller.set('model', model);
		controller.set('tempQuery', this.paramsFor(this.routeName).query);
	}
});
