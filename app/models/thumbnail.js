import Model, { attr } from '@ember-data/model';

export default Model.extend({
  quality: attr('string'),
  url: attr('string')
});