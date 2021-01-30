import ApplicationAdapter from 'cablecast-public-site/adapters/application';

export default ApplicationAdapter.extend({
  pathForType: function(/*type*/) {
        return 'shows/search/advanced';
  }
});
