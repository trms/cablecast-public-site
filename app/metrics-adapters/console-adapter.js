import BaseAdapter from 'ember-metrics/metrics-adapters/base';
import classic from 'ember-classic-decorator';

@classic
export default class ConsoleAdapter extends BaseAdapter {
  static supportsFastBoot = true;

  toStringExtension() {
    return 'console';
  }

  init() {}

  identify() {}

  trackEvent() {
    console.log('Metrics:', 'trackEvent', ...arguments); // eslint-disable-line no-console
  }

  trackPage() {
    console.log('Metrics:', 'trackPage', ...arguments); // eslint-disable-line no-console
  }

  alias() {}

  willDestroy() {}
}
