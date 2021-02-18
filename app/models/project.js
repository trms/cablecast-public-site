import Model, { attr, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  name: attr('string'),
  producer: belongsTo('producer', {async: true}),
  podcast: attr('boolean'),
  podcastName: attr('string'),
  podcastDescription: attr('string'),
  podcastUrl: attr('string'),
  itunesUrl: computed('podcastUrl', function() {
    return this.podcastUrl.replace(/https?/, 'iptc');
  })
});
