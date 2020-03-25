import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'public/config/environment';

export default DS.RESTAdapter.extend({
  fastboot: Ember.inject.service(),
	namespace: 'cablecastapi/v1',
  host: Ember.computed('fastboot.isFastBoot', function() {
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
