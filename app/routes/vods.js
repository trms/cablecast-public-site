import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import SetPageTitle from 'cablecast-public-site/mixins/set-page-title';

@classic
export default class VodsRoute extends Route.extend(SetPageTitle) {
    afterModel() {
		this.setTitle('Vods');
	}

    model() {
    return this.store.findAll('vod');
  }
}
