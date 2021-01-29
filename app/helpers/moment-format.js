/*globals moment*/
import { helper as buildHelper } from '@ember/component/helper';

export default buildHelper(function([date, format='MMMM Do YYYY, h:mm:ss a']) {
  return moment(date).format(format);
});
