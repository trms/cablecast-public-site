import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['channel'],

  actions: {
		navSearch: function(query) {
			this.transitionToRoute('search', {queryParams: {query: query}});
		}
	}
});
