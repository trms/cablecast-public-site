import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

@classic
export default class Vod extends Model {
  @attr('string')
  fileName;

  @belongsTo('show', { async: true })
  show;

  @hasMany('chapter', { async: true })
  chapters;

  @attr('boolean')
  chaptersPublished;

  @belongsTo('vod-configuration', { async: true })
  vodConfiguration;

  @hasMany('vod-transaction', { async: true })
  vodTransactions;

  @belongsTo('vod-transaction', { async: true })
  lastTransaction;

  @computed('lastTransaction.transactionType')
  get isReady() {
    return this.get('lastTransaction.transactionType') === 5;
  }

  @attr('string')
  embedCode;

  @attr('string')
  url;

  @attr('boolean')
  isWatchable;
}
