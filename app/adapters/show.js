import classic from 'ember-classic-decorator';
import ApplicationAdapter from 'cablecast-public-site/adapters/application';

@classic
export default class Show extends ApplicationAdapter {
  coalesceFindRequests = true;

  buildURL(modelName, id, snapshot, requestType, query) {
    var url = super.buildURL(modelName, id, snapshot, requestType, query);
    switch (requestType) {
      case 'findMany':
        url += '?include=reel,webfile';
        break;
      default:
        break;
    }
    return url;
  }
}
