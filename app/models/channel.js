import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

@classic
export default class Channel extends Model {
  @attr('string')
  name;

  @attr()
  primaryLocation;

  @belongsTo('public-site', { async: false })
  publicSite;

  @hasMany('live-stream', { async: true })
  liveStreams;
}
