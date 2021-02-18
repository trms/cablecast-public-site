import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  producer: DS.belongsTo('producer', {async: true}),
  podcast: DS.attr('boolean'),
  podcastName: DS.attr('string'),
  podcastDescription: DS.attr('string'),
  podcastUrl: DS.attr('string'),
  itunesUrl: computed('podcastUrl', function() {
    return this.podcastUrl.replace(/https?/, 'iptc');
  })
});
