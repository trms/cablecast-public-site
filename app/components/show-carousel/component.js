import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  fastboot: service(),

  didInsertElement(){
    this.$('#carousel').carousel('cycle');
  }

});
