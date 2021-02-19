import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  fastboot: service(),
  headData: service(),

  setTitle(title) {
    if (this.get('fastboot.isFastBoot')) {
      this.headData.set('title', title);
    } else {
      document.title = title;
    }
  },
});
