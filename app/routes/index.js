import classic from 'ember-classic-decorator';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

function filterShows(shows) {
  return shows.filter(function (show) {
    return get(show, 'showThumbnails.length') > 0 && show.cgExempt === false;
  });
}

@classic
export default class IndexRoute extends Route {
  @service futureRuns;

  model() {
    let channel = this.modelFor('application').channel;

    let carouselShows = channel
      .get('publicSite.carouselSavedSearch')
      .then((search) => {
        if (search) {
          return this.store
            .query('show', {
              ids: search.get('results').slice(0, 20),
              include: 'thumbnail,vod,category,project,producer,reel',
            })
            .then(filterShows);
        }
      });

    return hash({
      carouselShows,
      futureRuns: this.futureRuns.fetch(channel),
      defaultShows: this.store
        .query('show', {
          page_size: 24,
          location: channel.get('primaryLocation'),
        })
        .then(filterShows),
      categories: this.store.findAll('category'),
      projects: this.store.findAll('project'),
      producers: this.store.findAll('producer'),
    });
  }
}
