import Ember from 'ember';

export default Ember.Route.extend({

  model(){
    return Ember.RSVP.hash({
      channels: this.get('store').query('channel', {include: 'publicsite,webfile,thumbnail'}),
    });
  }
});