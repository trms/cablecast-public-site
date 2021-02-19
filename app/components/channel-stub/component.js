import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('')
export default class ChannelStub extends Component {
  @computed('channel.{publicSite.siteName,name}')
  get siteName() {
    return this.get('channel.publicSite.siteName') || this.get('channel.name');
  }

  @computed('channel.publicSite.{logo,squareLogo}')
  get logo() {
    return this.get('channel.publicSite.squareLogo.url') || this.get('channel.publicSite.logo.url');
  }
}
