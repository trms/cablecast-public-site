import Share from 'ember-social-share/components/fb-share-button';

export default Share.extend({
  store: Ember.inject.service(),
  shareURL: Ember.computed(function() {
    let base=  this.get('store')
                   .peekAll('option')
                   .findBy('name', 'server_base_url')
                   .get('value');
    return `${base}/TightBook/share`;
  })
});