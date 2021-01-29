import Route from '@ember/routing/route';
import SetPageTitle from 'public/mixins/set-page-title';

export default Route.extend(SetPageTitle, {

	afterModel() {
		this.setTitle('Vods');
	},

	model: function() {
    return this.store.findAll('vod');
  }
});
