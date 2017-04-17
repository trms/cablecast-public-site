import DS from 'ember-data';

export default DS.Model.extend({
  channel: DS.belongsTo('channel', {async: true}),
	show: DS.belongsTo('show', {async: true}),
	scheduleItem: DS.belongsTo('schedule-item', {async: true}),
  runDateTime: DS.attr('date')
});
