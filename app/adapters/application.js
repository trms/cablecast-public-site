import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://vod.easthamptonmedia.org/',
	namespace: 'cablecastapi/v1'
});
