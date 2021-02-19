import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import RESTAdapter from '@ember-data/adapter/rest';
import ENV from 'cablecast-public-site/config/environment';

@classic
export default class Application extends RESTAdapter {
  @service
  fastboot;

  namespace = 'cablecastapi/v1';

  @computed('fastboot.isFastBoot')
  get host() {
    if (ENV.environment === 'production' && this.get('fastboot.isFastBoot')) {
      return 'http://localhost:55001';
    }
    if (ENV.environment === 'development' && this.get('fastboot.isFastBoot')) {
      return 'http://localhost:4200';
    } else if (ENV.environment === 'development') {
      return 'http://localhost:4200';
    }
  }
}
