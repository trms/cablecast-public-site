import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import SetPageTitle from 'cablecast-public-site/mixins/set-page-title';
import moment from 'moment';

@classic
export default class ScheduleRoute extends Route.extend(SetPageTitle) {
  queryParams = {
    currentDay: {
      refreshModel: true,
    },
  };

  afterModel() {
    this.setTitle('Schedule');
  }

  model(params) {
    var appParams = this.paramsFor('application');
    var _start = moment(params.currentDay).startOf('day').format();
    var _end = moment(params.currentDay).add(1, 'days').format();

    return this.store
      .query('schedule-item', {
        channel: appParams.channel,
        start: _start,
        end: _end,
        include: 'show,reel,vod,vodTransaction',
        page_size: -1,
        include_cg_exempt: false,
      })
      .then((runs) => {
        return runs.filter(function (run) {
          return run.get('idType') === 1 && run.get('cgExempt') === false;
        });
      });
  }

  setupController(controller) {
    super.setupController(...arguments);
    let appParams = this.paramsFor('application');
    controller.set(
      'channel',
      this.store.peekRecord('channel', appParams.channel)
    );
  }
}
