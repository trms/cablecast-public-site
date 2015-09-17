import Ember from 'ember';

export default Ember.Controller.extend({
  show: Ember.computed.alias('model.show'),
  runs: Ember.computed.alias('model.runs')
});
