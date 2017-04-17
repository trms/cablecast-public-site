import Ember from 'ember';

export default Ember.Mixin.create({
  fastboot: Ember.inject.service(),
  headData: Ember.inject.service(),

  setTitle(title) {
    if (this.get('fastboot.isFastBoot')) {
      this.get('headData').set('title', title);
    }
    else {
      document.title = title;
    }
  }
});
