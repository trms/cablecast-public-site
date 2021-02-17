import jQuery from 'jquery';
import { bind } from '@ember/runloop';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['vod-chapters'],

  didInsertElement: function () {
    this._messageHandler = bind(this, 'processMessage');
    window.addEventListener('message', this._messageHandler, false);
  },

  willDestroyElement: function () {
    if (this._messageHandler) {
      window.removeEventListener('message', this._messageHandler);
    }
  },

  processMessage: function (event) {
    if (event.data.message === 'ready' && this.get('seekto')) {
      this.seekTo(this.get('seekto'));
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

  changeActiveChapter: function (chapter) {
    if (chapter == null) {
      return;
    }
    this.set('activeChapter', chapter);
    var element = this.element.querySelector(`[data-chapter="${chapter.get('id')}"]`);
    var componentElement = jQuery(this.element);
    componentElement.animate({
      scrollTop: jQuery(element).offset().top - componentElement.offset().top + componentElement.scrollTop()
    });
  },

  sendMessage: function (message) {
    var player = jQuery('iframe')[0];
    if (player) {
      player.contentWindow.postMessage(message, '*');
    }
  },

  seekTo: function (offset) {
    var message = {
      type: 'player-cue',
      value: offset
    };
    this.sendMessage(message);
  },

  actions: {
    cueTo: function (chapter) {
      var setSeekTo = this.get('setSeekTo');
      if (setSeekTo) {
        setSeekTo(chapter.get('offset'));
      }
      this.seekTo(chapter.get('offset'));
    }
  }
});
