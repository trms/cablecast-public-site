import Ember from 'ember';

export default Ember.Route.extend({

  model(){
    return Ember.RSVP.hash({
      publicSites: this.get('store').findAll('publicSite'),
      channels: this.get('store').query('channel', {include: 'publicsite,webfile,thumbnail'}),
    });
  }
});