import { helper as buildHelper } from '@ember/component/helper';

export default buildHelper(function([start, end]) {
	var now = new Date();
	return start <= now && end > now;
});
