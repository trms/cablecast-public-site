import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  siteName: computed('channel.{publicSite.siteName,name}',function(){
    return this.get('channel.publicSite.siteName') || this.get('channel.name');
  }),

  logo: computed('channel.publicSite.{logo,squareLogo}',function(){
    return this.get('channel.publicSite.squareLogo.url') || this.get('channel.publicSite.logo.url');
  }),
});
