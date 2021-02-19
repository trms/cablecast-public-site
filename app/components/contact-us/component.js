import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import ENV from 'cablecast-public-site/config/environment';

@classic
@tagName('')
export default class ContactUs extends Component {
  @computed
  get rootURL() {
    return ENV.rootURL;
  }

  channelContactInfo = null;
}