import Model, { belongsTo, attr } from '@ember-data/model';

export default Model.extend({
  channel: belongsTo('channel', {async: true}),
	show: belongsTo('show', {async: true}),
	scheduleItem: belongsTo('schedule-item', {async: true}),
  runDateTime: attr('date')
});
