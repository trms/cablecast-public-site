import Ember from 'ember';

export default Ember.Route.extend({
  fastboot: Ember.inject.service(),

	queryParams: {
		query: {
			refreshModel: true
		},
		page: {
			refreshModel: true
		}
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
		if(this.get('fastboot.isFastBoot') === false){
      window.scrollTo(0,0);
    }
	},

  deactivate(){
    this._super(...arguments);
    this.controller.set('page',1);
  },
});
