import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('')
export default class ScheduleRow extends Component {
    @computed('item.{start,end}')
    get isOnAir() {
        var now = new Date();
        var start = this.get('item.start');
        var end = this.get('item.end');
        return start <= now && end > now;
    }
}
