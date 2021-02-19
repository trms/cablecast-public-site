import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('')
export default class PaginatedShowList extends Component {
  @computed('page', 'pageSize')
  get offset() {
    return (this.page - 1) * this.pageSize;
  }

  @computed('offset', 'pageSize')
  get firstResult() {
    return 1 + this.offset;
  }

  @computed('offset', 'pageSize', 'total')
  get lastResult() {
    var total = this.total;
    var last = (this.offset * this.pageSize) + this.pageSize;
    return Math.min(last, total);
  }

  @computed('total', 'pageSize')
  get showPaginationControl() {
    return this.total > this.pageSize;
  }

  @action
  _goToPage(page) {
    this.goToPage(page);
  }
}
