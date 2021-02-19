import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import SetPageTitle from 'cablecast-public-site/mixins/set-page-title';
import ResetScroll from 'cablecast-public-site/mixins/reset-scroll';

@classic
export default class SearchRoute extends Route.extend(SetPageTitle, ResetScroll) {
    queryParams = {
		query: {
			refreshModel: true
		},
		page: {
			refreshModel: true
		}
	};

    afterModel() {
		this.setTitle('Search Results');
	}

    model(params) {
		var channel = this.modelFor('application').channel;
		return this.store.query('show', {
			offset: params.page - 1,
			search: params.query,
			location: channel.get('primaryLocation')
		});
	}

    setupController(controller, model) {
		controller.set('model', model);
		controller.set('tempQuery', this.paramsFor(this.routeName).query);
	}

    deactivate() {
      super.deactivate(...arguments);
      this.controller.set('page',1);
    }
}
