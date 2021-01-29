/* globals moment */
import Ember from 'ember';

export default Ember.Mixin.create({

  getFutureRuns(channel){
    return this.store.query('schedule-item', {
      start: moment().startOf('day').toISOString(),
      end: moment().add(24, 'hours').toISOString(),
      channel: channel.get('id'),
      include: 'show,reel',
      include_cg_exempt: false,
      page_size: -1
    })
    .then((items) => {
      return items
        .filterBy('idType',1)
        .filterBy('cgExempt',false)
        .filter((item)=>{
          let now = new Date();
          let end = item.get('end');
          return end > now;
        })
        .slice(0, 7);
    });
  }

});
