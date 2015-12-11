import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['channel'],

  viewingChannelChooser: true,

  projects: Ember.computed('model.primaryLocation.id', function() {
    return this.store.query('project', {location: this.get('model.primaryLocation.id')})
  }),

  hasPodcasts: Ember.computed('projects.[]', function() {
    return this.get('projects').filter(function(project) {
      // Test that a project has a name and is marked for podcasting.
      return project.get('name') &&
             project.get('podcast');
    }).length > 0;
  }),

  actions: {
		navSearch: function(query) {
			this.transitionToRoute('search', {queryParams: {query: query}});
		},
    showChannelChooser: function() {
      this.set('viewingChannelChooser', true);
    }
	}
});
