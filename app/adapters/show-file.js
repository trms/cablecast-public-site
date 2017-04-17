import ApplicationAdapter from 'public/adapters/application';

export default ApplicationAdapter.extend({
  pathForType: function(/*type*/) {
      return 'show/files';
  }
});
