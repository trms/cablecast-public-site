import Ember from 'ember';
import SetPageTitle from 'public/mixins/set-page-title';

export default Ember.Route.extend(SetPageTitle, {

	afterModel() {
		this.setTitle('Vods');
	},

	model: function() {
    return this.store.findAll('vod');
  }
});
