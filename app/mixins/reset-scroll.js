import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  fastboot: service(),

  setupController() {
    this._super(...arguments);
    if (this.get('fastboot.isFastBoot') === false) {
      window.scrollTo(0,0);
    }
  }
});
