import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class VodsRoute extends Route {
  model() {
    return this.store.findAll('vod');
  }
}
