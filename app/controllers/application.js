import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class ApplicationController extends Controller {
  queryParams = ['channel', 'showOtherChannels'];
  showOtherChannels = true;

  @computed('model.channel.primaryLocation.id')
  get projects() {
    return this.model.projects;
  }

  @computed
  get allChannels() {
    return this.store.peekAll('channel');
  }

  @computed('allChannels.[]')
  get publicChannels() {
    return this.allChannels
      .filterBy('publicSite.includeInIndex', true)
      .sortBy('publicSite.siteName');
  }

  @computed('projects.[]')
  get hasPodcasts() {
    return (
      this.projects.filter(function (project) {
        // Test that a project has a name and is marked for podcasting.
        return project.get('name') && project.get('podcast');
      }).length > 0
    );
  }

  @action
  navSearch(query) {
    this.transitionToRoute('search', { queryParams: { query: query } });
  }
}
