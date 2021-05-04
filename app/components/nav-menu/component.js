import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import ENV from 'cablecast-public-site/config/environment';

@classic
@tagName('')
export default class NavMenu extends Component {
  @computed
  get rootURL() {
    return ENV.rootURL;
  }

  @action
  search(query) {
    this.onSearch(query);
  }

  @action
  watch(stream_id) {
    this.onSearch(stream_id);
  }
}
