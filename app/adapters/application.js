import RESTAdapter from '@ember-data/adapter/rest';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'cablecast-public-site/config/environment';

export default RESTAdapter.extend({
  fastboot: service(),
	namespace: 'cablecastapi/v1',
  host: computed('fastboot.isFastBoot', function() {
    if (ENV.environment === 'production' && this.get('fastboot.isFastBoot')) {
      return 'http://localhost:55001';
    }
    if (ENV.environment === 'development' && this.get('fastboot.isFastBoot')) {
      return 'http://localhost:4200';
    } else if (ENV.environment === 'development') {
      return 'http://localhost:4200';
    }
  })
});
