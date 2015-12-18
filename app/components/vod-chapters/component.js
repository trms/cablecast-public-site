import Ember from 'ember';

export default Ember.Component.extend({
	player: null,
	didInsertElement: function() {
    	this.set('player', Ember.$('iframe')[0]);
    	this._messageHandler = Ember.run.bind(this, 'processMessage');
    	window.addEventListener('message', this._messageHandler, false);
  	},
  
	willDestroyElement: function() {
		if (this._messageHandler) {
			window.removeEventListener('message', this._messageHandler);
		}
	},

	processMessage: function(event) {

	},
	sendMessage: function(message){
		var player = this.get('player');
		if (player) {
			player.contentWindow.postMessage(message, '*');
		}
	},
	actions: {
		cueTo: function(marker){
			var message = {
				type: 'player-cue',
				value: marker.get('offset')
			}
			this.sendMessage(message);
		}
	}
});