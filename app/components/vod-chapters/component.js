import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['vod-chapters'],

	didInsertElement: function() {
    	this._messageHandler = Ember.run.bind(this, 'processMessage');
    	window.addEventListener('message', this._messageHandler, false);
  	},

	willDestroyElement: function() {
		if (this._messageHandler) {
			window.removeEventListener('message', this._messageHandler);
		}
	},

	processMessage: function(event) {
    console.log('EVENT: ', event);
    if (event.data.message === 'ready' && this.get('seekto')) {
      this.seekTo(this.get('seekto'));
    }

    if (event.data.message === 'timeupdate') {
      var markers = this.get('markers').toArray();
      var activeMarker = null;
      var time = event.data.value;
      for (var i = 0; i < markers.length; i++) {
        var offset = markers[i].get('offset');

        if (offset <= time) {
          if (i + 1 < markers.length) {
            // Test if the next marker's offset is greater than time.
            // If it is than we this is the active marker. If not we want to test the next marker.
            if (markers[i + 1].get('offset') > time) {
              activeMarker = markers[i];
              break;
            }
          } else {
            // This is the last marker, so it's good until the end of the video.
            activeMarker = markers[i];
            break;
          }
        }
      }
      if (this.get('activeMarker') !== activeMarker) {
        this.changeActiveMarker(activeMarker);
      }
    }
	},

  changeActiveMarker: function(marker) {
    this.set('activeMarker', marker);
    var element = Ember.$(this.$().find(`[data-marker="${marker.get('id')}"]`)[0]);
    this.$().animate({
      scrollTop: element.offset().top - this.$().offset().top + this.$().scrollTop()
    });
  },

	sendMessage: function(message){
		var player = Ember.$('iframe')[0];
		if (player) {
			player.contentWindow.postMessage(message, '*');
		}
	},

  seekTo: function(offset) {
    var message = {
      type: 'player-cue',
      value: offset
    }
    this.sendMessage(message);
  },

	actions: {
		cueTo: function(marker){
      var setSeekTo = this.get('setSeekTo');
      if (setSeekTo) {
        setSeekTo(marker.get('offset'));
      }
			this.seekTo(marker.get('offset'));
		}
	}
});