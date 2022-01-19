import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import jQuery from 'jquery';
import Component from '@ember/component';
import ENV from 'cablecast-public-site/config/environment';

@classic
@tagName('')
export default class UpdateChannelStyles extends Component {
  @service
  fastboot;

  didReceiveAttrs() {
    return;
    super.didReceiveAttrs();
    let rootURL = ENV.rootURL;
    let channelID = this['channel-id'];
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
}
