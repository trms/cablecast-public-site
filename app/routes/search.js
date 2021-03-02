import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class SearchRoute extends Route {
  queryParams = {
    query: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  model(params) {
    var channel = this.modelFor('application').channel;
    return this.store.query('show', {
      offset: params.page - 1,
      search: params.query,
      location: channel.get('primaryLocation'),
    });
  }

  setupController(controller, model) {
    controller.set('model', model);
    controller.set('tempQuery', this.paramsFor(this.routeName).query);
  }

  deactivate() {
    super.deactivate(...arguments);
    this.controller.set('page', 1);
  }
}
