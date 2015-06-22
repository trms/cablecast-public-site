import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    if (params.channel === null) {
      return this.store.find('channel', 1);
    } else {
    	
      return this.store.find('channel', params.channel).then(function(channel) {

      	return channel.get('publicSiteConfiguration').then(function(publicSiteConfiguration){
      		
      		return publicSiteConfiguration;
      	});
      });
    }
  }
});
