import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('')
export default class PreviewSchedule extends Component {
  @computed('futureRuns.[]')
  get onAirRun() {
    return this.futureRuns.find((item) => {
      let now = new Date();
      let start = item.get('start');
      let end = item.get('end');
      return start <= now && end > now;
    });
  }
}
