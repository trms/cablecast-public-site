import Ember from 'ember';

export default Ember.Mixin.create({
  fastboot: Ember.inject.service(),

  setupController() {
    this._super(...arguments);
    if (this.get('fastboot.isFastBoot') === false) {
      window.scrollTo(0,0);
    }
  }
});
