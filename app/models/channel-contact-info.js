import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  address: DS.attr('string'),
  city: DS.attr('string'),
  zipcode: DS.attr('string'),
  state: DS.attr('string'),
  phone: DS.attr('string'),
  email: DS.attr('string'),
  web: DS.attr('string'),
  twitter: DS.attr('string'),
  facebook: DS.attr('string')
});
