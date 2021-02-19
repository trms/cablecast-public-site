import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo } from '@ember-data/model';

@classic
export default class FieldDisplay extends Model {
  @attr()
  label;

  @attr()
  field;

  @belongsTo('public-site', {async: true})
  publicSite;

  @attr('number')
  showField;

  @attr()
  widget;

  @attr('number')
  order;
}