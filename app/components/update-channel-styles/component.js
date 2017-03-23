import Ember from 'ember';
import ENV from 'public/config/environment';

export default Ember.Component.extend({
  fastboot: Ember.inject.service(),
  didReceiveAttrs() {
    let rootURL = ENV.rootURL;
    let channelID = this.get('channel-id');
    if (this.get('fastboot.isFastBoot') === false) {
      let custom = Ember.$('[data-channel-custom]')[0];
      let colors = Ember.$('[data-channel-colors]')[0];
      if (custom) {
        custom.href = `${rootURL}custom-${channelID}.css`;
      }
      if (colors) {
        colors.href = `${rootURL}colors-${channelID}.css`;
      }
    }
  }
});