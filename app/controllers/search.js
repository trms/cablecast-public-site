import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';

@classic
export default class SearchController extends Controller {
  queryParams = ['query', 'page'];
  page = 1;
  query = null;
  tempQuery = null;

  @alias('model.meta')
  meta;

  @computed('page', 'meta.{offset,pageSize}')
  get firstResult() {
    return 1 + this.get('meta.offset') * this.get('meta.pageSize');
  }

  @computed('meta.{count,offset,pageSize}', 'page')
  get lastResult() {
    var total = this.get('meta.count');
    var last =
      this.get('meta.offset') * this.get('meta.pageSize') +
      this.get('meta.pageSize');
    return Math.min(last, total);
  }

  @action
  submitSearch(query) {
    this.set('query', query);
  }

  @action
  goToPage(page) {
    this.set('page', page);
  }
}
