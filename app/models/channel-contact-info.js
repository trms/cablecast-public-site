import classic from 'ember-classic-decorator';
import Model, { attr } from '@ember-data/model';

@classic
export default class ChannelContactInfo extends Model {
  @attr('string')
  name;

  @attr('string')
  description;

  @attr('string')
  address;

  @attr('string')
  city;

  @attr('string')
  zipcode;

  @attr('string')
  state;

  @attr('string')
  phone;

  @attr('string')
  email;

  @attr('string')
  web;

  @attr('string')
  twitter;

  @attr('string')
  facebook;
}
