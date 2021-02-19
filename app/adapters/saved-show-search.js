import classic from 'ember-classic-decorator';
import ApplicationAdapter from 'cablecast-public-site/adapters/application';

@classic
export default class SavedShowSearch extends ApplicationAdapter {
  pathForType() /*type*/{
        return 'shows/search/advanced';
  }
}
