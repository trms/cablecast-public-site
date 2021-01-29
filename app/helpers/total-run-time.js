import { helper as buildHelper } from '@ember/component/helper';
import toTimecode from 'public/utils/timecode';

export default buildHelper(function(input) {
	return toTimecode(input);
});
