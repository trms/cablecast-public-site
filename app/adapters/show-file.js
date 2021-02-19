import classic from 'ember-classic-decorator';
import ApplicationAdapter from 'cablecast-public-site/adapters/application';

@classic
export default class ShowFile extends ApplicationAdapter {
  pathForType() /*type*/{
      return 'show/files';
  }
}
