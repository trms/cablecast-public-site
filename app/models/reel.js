import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model, { attr } from '@ember-data/model';

@classic
export default class Reel extends Model {
  @attr('number')
  length;

  @computed('length')
  get trt() {

    var seconds = this.length;

    var sec_num = parseInt(seconds, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
  }
}
