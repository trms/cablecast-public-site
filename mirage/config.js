export default function () {
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '/cablecastapi/v1'; // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */

  this.get('/channels', function (schema, request) {
    let channels = schema.channels.all();
    if (
      request.queryParams.include &&
      request.queryParams.include ===
        'publicsite,webfile,thumbnail,sitegallery,savedshowsearch'
    ) {
      let channelJSON = this.serialize(channels);
      let publicSiteIds = channels.models.map((c) => c.publicSite.id);
      let siteJSON = this.serialize(schema.publicSites.find(publicSiteIds));
      let savedShowSearchJSON = this.serialize(schema.savedShowSearches.all());
      return Object.assign({}, channelJSON, siteJSON, savedShowSearchJSON);
    }
    return channels;
  });

  this.get('/projects');
  this.get('/categories');
  this.get('/producers');
  this.get('/scheduleItems');
  this.get('/shows');
  this.get('/liveStreams/:id');
  this.get('/siteGalleries/:id');
  this.get('/vods');
}
