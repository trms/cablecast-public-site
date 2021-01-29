import Route from '@ember/routing/route';
import SetPageTitle from 'public/mixins/set-page-title';

export default Route.extend(SetPageTitle, {
  afterModel() {
    this.setTitle('Podcasts');
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
