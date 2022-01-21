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
    let host = params.host || 'watch.pittsfield.org';
    let base = "https://cablecast-cloud-pr-120.herokuapp.com";
    if (ENV.environment === 'development') {
      base = "http://localhost:5000";
    }
    let result = await fetch(`${base}api/publicsitedata?host=${host}`);
    let json = await result.json();
    
    return json;
  }
}
