import Ember from 'ember';
import SetPageTitle from 'public/mixins/set-page-title';

export default Ember.Route.extend(SetPageTitle, {
	queryParams: {
		query: {
			refreshModel: true
		},
		page: {
			refreshModel: true
		}
	},

	afterModel() {
		this.setTitle('Search Results');
	},

	model: function(params) {
		var channel = this.modelFor('application').channel;
		return this.store.query('show', {
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
