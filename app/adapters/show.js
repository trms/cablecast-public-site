import ApplicationAdapter from 'cablecast-public-site/adapters/application';

export default ApplicationAdapter.extend({
  coalesceFindRequests: true,
	buildURL: function(modelName, id, snapshot, requestType, query) {
		var url = this._super(modelName, id, snapshot, requestType, query);
    switch (requestType) {
      case 'findMany':
        url += '?include=reel,webfile';
        break;
      default:
        break;
    }
		return url;
	}
});
