import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['channel'],
  
  actions: {
		navSearch: function(query) {
			this.transitionToRoute('search', {queryParams: {query: query}});
		},
		watchLive: function(stream_id){
			this.transitionToRoute('watch-now', stream_id);
		}
	}
});
