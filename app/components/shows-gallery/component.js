import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task } from 'ember-concurrency';

@classic
@tagName('')
export default class ShowsGallery extends Component {
  @service
  store;

  init() {
    super.init(...arguments);
    this.showsTask.perform();
  }

  collapsed = false;

  @task(function* () {
    let search = this.get('gallery.savedShowSearch');
    if (!search) {
      return;
    }
    let limit = this.get('gallery.displayLimit') * 3;
    let showIds = search.get('results').slice(0, limit);

    if (showIds.length === 0) {
      return;
    }

    let shows = this.store.query('show', {
      ids: showIds,
      include: 'thumbnail,vod,category,project,producer,reel',
      page_size: limit,
    });

    yield shows;
    this.set('shows', shows);
  })
  showsTask;

  @computed('gallery.displayLimit', 'shows.[]')
  get filteredShows() {
    let shows = this.shows || [];
    let limit = this.get('gallery.displayLimit');
    return shows.filterBy('showThumbnails.length').splice(0, limit);
  }

  @action
  collapseGallery() {
    this.toggleProperty('collapsed');
  }
}
