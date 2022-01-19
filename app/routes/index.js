import classic from 'ember-classic-decorator';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

function filterShows(shows) {
  return shows.filter(function (show) {
    return get(show, 'showThumbnails.length') > 0 && show.cgExempt === false;
  });
}

@classic
export default class IndexRoute extends Route {
  @service futureRuns;

  async model(params) {
    let result = await fetch(`/api/publicsitedata?host=${params.host}`);
    let json = await result.json();
    
    return json;
  }
}
