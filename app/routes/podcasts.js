import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import SetPageTitle from 'cablecast-public-site/mixins/set-page-title';

@classic
export default class PodcastsRoute extends Route.extend(SetPageTitle) {
  afterModel() {
    this.setTitle('Podcasts');
  }

  model() {
    return this.store.findAll('project').then(function (projects) {
      var sorted = projects.sortBy('podcastName');
      return sorted.filter(function (project) {
        return (
          project.get('podcast') &&
          project.get('podcastName') &&
          project.get('podcastUrl')
        );
      });
    });
  }
}
