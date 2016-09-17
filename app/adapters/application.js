import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://tighty.tv',
	namespace: 'cablecastapi/v1'
});
