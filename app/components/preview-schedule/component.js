import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  onAirRun: computed('futureRuns.[]',function(){
    return this.futureRuns.find((item)=>{
      let now = new Date();
      let start = item.get('start');
      let end = item.get('end');
      return start <= now && end > now;
    });
  }),
});
