import Ember from 'ember';

export default Ember.Route.extend({
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
