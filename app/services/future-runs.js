import Service, { inject as service } from '@ember/service';
import moment from 'moment';

export default class FutureRunsService extends Service {
  @service store;

  fetch(channel) {
    return this.store
      .query('schedule-item', {
        start: moment().startOf('day').toISOString(),
        end: moment().add(24, 'hours').toISOString(),
        channel: channel.get('id'),
        include: 'show,reel',
        include_cg_exempt: false,
        page_size: -1,
      })
      .then((items) => {
        return items
          .filterBy('idType', 1)
          .filterBy('cgExempt', false)
          .filter((item) => {
            let now = new Date();
            let end = item.get('end');
            return end > now;
          })
          .slice(0, 7);
      });
  }
}
