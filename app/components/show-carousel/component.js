import { inject as service } from '@ember/service';
import jQuery from 'jquery';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  fastboot: service(),

  didInsertElement(){
    jQuery('#carousel').carousel('cycle');
  }
});
