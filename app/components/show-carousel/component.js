import Ember from 'ember';

export default Ember.Component.extend({
  fastboot: Ember.inject.service(),

  didInsertElement(){
    this.$('#carousel').carousel('cycle');
  }

});
