import Model, { attr } from '@ember-data/model';

export default Model.extend({
  url: attr('string'),
  name: attr('string')
});