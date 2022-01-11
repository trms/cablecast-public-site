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
    if (event.data.message === 'ready' && this.get('seekto')) {
      this.seekTo(this.get('seekto'));
    }

    if (event.data.message === 'seek' && event.data.seconds >= 0) {
      this.seekTo(event.data.seconds);
    }

    if (event.data.message === 'timeupdate') {
      var chapters = this.get('chapters').toArray();
      var activeChapter = null;
      var time = event.data.value;
      for (var i = 0; i < chapters.length; i++) {
        var offset = chapters[i].get('offset');

        if (offset <= time) {
          if (i + 1 < chapters.length) {
            // Test if the next chapter's offset is greater than time.
            // If it is than we this is the active chapter. If not we want to test the next chapter.
            if (chapters[i + 1].get('offset') > time) {
              activeChapter = chapters[i];
              break;
            }
          } else {
            // This is the last chapter, so it's good until the end of the video.
            activeChapter = chapters[i];
            break;
          }
        }
      }
      if (this.get('activeChapter') !== activeChapter) {
        this.changeActiveChapter(activeChapter);
      }
    }
	},

  changeActiveChapter: function(chapter) {
    this.set('activeChapter', chapter);
    var element = Ember.$(this.$().find(`[data-chapter="${chapter.get('id')}"]`)[0]);
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
    };
    this.sendMessage(message);
  },

	actions: {
		cueTo: function(chapter){
      var setSeekTo = this.get('setSeekTo');
      if (setSeekTo) {
        setSeekTo(chapter.get('offset'));
      }
			this.seekTo(chapter.get('offset'));
		}
	}
});
