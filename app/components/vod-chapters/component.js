import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import jQuery from 'jquery';
import { bind } from '@ember/runloop';
import Component from '@ember/component';

@classic
@classNames('vod-chapters')
export default class VodChapters extends Component {
  didInsertElement() {
    super.didInsertElement(...arguments);
    this._messageHandler = bind(this, 'processMessage');
    window.addEventListener('message', this._messageHandler, false);
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    if (this._messageHandler) {
      window.removeEventListener('message', this._messageHandler);
    }
  }

  processMessage(event) {
    if (event.data.message === 'ready' && this.seekto) {
      this.seekTo(this.seekto);
    }

    if (event.data.message === 'timeupdate') {
      var chapters = this.chapters.toArray();
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
      if (this.activeChapter !== activeChapter) {
        this.changeActiveChapter(activeChapter);
      }
    }
  }

  changeActiveChapter(chapter) {
    if (chapter == null) {
      return;
    }
    this.set('activeChapter', chapter);
    var element = this.element.querySelector(
      `[data-chapter="${chapter.get('id')}"]`
    );
    var componentElement = jQuery(this.element);
    componentElement.animate({
      scrollTop:
        jQuery(element).offset().top -
        componentElement.offset().top +
        componentElement.scrollTop(),
    });
  }

  sendMessage(message) {
    var player = jQuery('iframe')[0];
    if (player) {
      player.contentWindow.postMessage(message, '*');
    }
  }

  seekTo(offset) {
    var message = {
      type: 'player-cue',
      value: offset,
    };
    this.sendMessage(message);
  }

  @action
  cueTo(chapter) {
    var setSeekTo = this.setSeekTo;
    if (setSeekTo) {
      setSeekTo(chapter.get('offset'));
    }
    this.seekTo(chapter.get('offset'));
  }
}
