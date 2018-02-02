import Ember from 'ember';

export default Ember.Component.extend({

  onAirRun: Ember.computed('futureRuns.[]',function(){
    return this.get('futureRuns').find((item)=>{
      let now = new Date();
      let start = item.get('start');
      let end = item.get('end');
      return start <= now && end > now;
    });
  }),
});
