import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  producer: DS.belongsTo('producer', {async: true}),
  podcast: DS.attr('boolean'),
  podcastName: DS.attr('string'),
  podcastDescription: DS.attr('string'),
  podcastUrl: DS.attr('string'),
  itunesUrl: Ember.computed('podcastUrl', function() {
    return this.get('podcastUrl').replace(/https?/, 'iptc');
  })
});
