import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model, { attr, belongsTo } from '@ember-data/model';

@classic
export default class Project extends Model {
  @attr('string')
  name;

  @belongsTo('producer', { async: true })
  producer;

  @attr('boolean')
  podcast;

  @attr('string')
  podcastName;

  @attr('string')
  podcastDescription;

  @attr('string')
  podcastUrl;

  @computed('podcastUrl')
  get itunesUrl() {
    return this.podcastUrl.replace(/https?/, 'iptc');
  }
}
