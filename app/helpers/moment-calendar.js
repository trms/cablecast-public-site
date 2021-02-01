import { helper as buildHelper } from '@ember/component/helper';
import moment from 'moment';

export default buildHelper(function(params) {
  return moment(params[0]).calendar(null, {
    sameDay: '[Today] [at] LT',
    nextWeek: 'M/D [at] LT',
    sameElse: 'M/D [at] LT'
  });
});
