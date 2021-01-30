import { computed } from '@ember/object';
import Component from '@ember/component';
import ENV from 'cablecast-public-site/config/environment';

export default Component.extend({
  classNames: ['show-stub'],
  rootURL: computed(function() {
    return ENV.rootURL;
  })
});
