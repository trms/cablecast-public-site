import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import toTimecode from 'cablecast-public-site/utils/timecode';

@classic
export default class ShowField extends Helper {
  @service
  store;

  lookupCustom(show, fieldDisplay) {
    let value = show.get('customFields').find((field) => {
      return field.showField === fieldDisplay.get('showField');
    });

    if (value) {
      switch (value.type) {
        case 'file': {
          if (value.value == null) {
            return;
          }

          let file = this.store.peekRecord('web-file', value.value);
          return (file || {}).url;
        }
        case 'producer': {
          let producer = this.store.findRecord('producer', value.value);
          return (producer || {}).name;
        }
        default:
          return value.value;
      }
    }
  }

  compute([show, fieldDisplay]) {
    switch (fieldDisplay.get('field')) {
      case 'localId':
        return show.get('localId');
      case 'showId':
        return show.get('id');
      case 'project':
        return show.get('project.name');
      case 'title':
        return show.get('title');
      case 'cgTitle':
        return show.get('cgTitle');
      case 'eventDate':
        return show.get('eventDate');
      case 'totalRunTime':
        return toTimecode(show.get('totalRunTime'));
      case 'category':
        return show.get('category.name');
      case 'producer':
        return show.get('producer.name');
      case 'comments':
        return show.get('comments');
      case 'runCount':
        return show.get('runCount');
      case 'firstRun':
        return show.get('absoluteFirstRun.runDateTime');
      case 'custom':
        return this.lookupCustom(show, fieldDisplay);
      default:
        return `Unhandled Field ${fieldDisplay.get('field')}`;
    }
  }
}
