import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),
	model: function(params) {
		var start = new Date();
		return Ember.RSVP.hash({
			show: this.store.query('show', {
        ids: [params.id],
        include: 'thumbnail,vod'
      })
      .then(function(result) {
        return result.findBy('id', params.id);
      }),
			runs: this.store.query('schedule-item', {
	    	show: params.id,
    		start: start.toISOString(),
    		page_size: 5
	    })
		});
	},

  afterModel: function() {
    var show = this.modelFor(this.routeName).show;
    Ember.set(this, 'headData.title', show.get('cgTitle'));
    Ember.set(this, 'headData.description', show.get('comments') || show.get('cgTitle'));
    Ember.set(this, 'headData.image', show.get('showThumbnails.firstObject.url'));
  }
});
