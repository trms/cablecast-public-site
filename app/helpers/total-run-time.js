import { helper as buildHelper } from '@ember/component/helper';
import toTimecode from 'cablecast-public-site/utils/timecode';

export default buildHelper(function (input) {
  return toTimecode(input);
});
