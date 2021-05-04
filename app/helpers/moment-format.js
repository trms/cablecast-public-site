import { helper as buildHelper } from '@ember/component/helper';
import moment from 'moment';

export default buildHelper(function ([
  date,
  format = 'MMMM Do YYYY, h:mm:ss a',
]) {
  return moment(date).format(format);
});
