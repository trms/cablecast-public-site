import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  fileName: attr('string'),
  show: belongsTo('show', { async: true }),
  chapters: hasMany('chapter', { async: true }),
  chaptersPublished: attr('boolean'),
  vodConfiguration: belongsTo('vod-configuration', { async: true }),
  vodTransactions: hasMany('vod-transaction', { async: true }),
  lastTransaction: belongsTo('vod-transaction', { async: true }),
  isReady: computed('lastTransaction.transactionType', function () {
    return this.get('lastTransaction.transactionType') === 5;
  }),
  embedCode: attr('string'),
  url: attr('string'),
  isWatchable: attr('boolean')
});
