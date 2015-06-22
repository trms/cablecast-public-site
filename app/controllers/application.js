import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['channel'],
  channel: 4,
  actions: {
		navSearch: function(query) {
			this.transitionToRoute('search', {queryParams: {query: query}});
		},
		watchLive: function(stream_id){
			this.transitionToRoute('watch', stream_id);
		}
	}
});