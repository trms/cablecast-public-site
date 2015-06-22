import Ember from 'ember';

export default Ember.Controller.extend({
  showsWithThumbnails: Ember.computed('model.recentPrograms.showThumbnails.[]', {
  	get: function() {
  		return this.get('model.recentPrograms').filter(function(show) {
  		return Ember.get(show, 'showThumbnails.length') > 0
  			   && Ember.get(show, 'cgExempt') === false;
  	});
  	}
  })
});