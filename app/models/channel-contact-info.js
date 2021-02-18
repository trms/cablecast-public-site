import Model, { attr } from '@ember-data/model';

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  address: attr('string'),
  city: attr('string'),
  zipcode: attr('string'),
  state: attr('string'),
  phone: attr('string'),
  email: attr('string'),
  web: attr('string'),
  twitter: attr('string'),
  facebook: attr('string')
});
