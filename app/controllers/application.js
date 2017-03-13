import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['channel'],

  projects: Ember.computed('model.channel.primaryLocation.id', function() {
    return this.model.projects;
  }),

  allChannels: Ember.computed(function(){
    return this.store.peekAll('channel');
  }),

  publicSites: Ember.computed('allChannels.[]',function(){
    return this.get('allChannels').getEach('publicSite').filterBy('enabled',undefined);
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
    changeChannel(channel){
      this.set('channel', channel.get('id'));
    }
	}
});
