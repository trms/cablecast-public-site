import jQuery from 'jquery';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import ENV from 'cablecast-public-site/config/environment';

export default Component.extend({
  fastboot: service(),
  didReceiveAttrs() {
    let rootURL = ENV.rootURL;
    let channelID = this.get('channel-id');
    if (this.get('fastboot.isFastBoot') === false) {
      let custom = jQuery('[data-channel-custom]')[0];
      let colors = jQuery('[data-channel-colors]')[0];
      if (custom) {
        custom.href = `${rootURL}custom-${channelID}.css`;
      }
      if (colors) {
        colors.href = `${rootURL}colors-${channelID}.css`;
      }
    }
  }
});