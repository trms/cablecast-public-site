import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  afterModel() {
    let headData = this.get('headData');
    headData.set('title', 'Podcasts');
  },

  model: function() {
    return this.store.findAll('project').
      then(function(projects) {
        var sorted = projects.sortBy('podcastName');
        return sorted.filter(function(project) {
          return project.get('podcast') &&
                 project.get('podcastName') &&
                 project.get('podcastUrl');
        });
      });
  }
});
