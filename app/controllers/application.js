import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['channel','showOtherChannels'],
  showOtherChannels:true,
  projects: computed('model.channel.primaryLocation.id', function() {
    return this.model.projects;
  }),

  allChannels: computed(function(){
    return this.store.peekAll('channel');
  }),

  publicChannels: computed('allChannels.[]',function(){
    return this.allChannels.filterBy('publicSite.includeInIndex',true).sortBy('publicSite.siteName');
  }),

  hasPodcasts: computed('projects.[]', function() {
    return this.projects.filter(function(project) {
      // Test that a project has a name and is marked for podcasting.
      return project.get('name') &&
             project.get('podcast');
    }).length > 0;
  }),

  actions: {
		navSearch: function(query) {
			this.transitionToRoute('search', {queryParams: {query: query}});
		},
	}
});
