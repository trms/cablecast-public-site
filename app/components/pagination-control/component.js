import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('')
export default class PaginationControl extends Component {
  total = 0;
  pageSize = 0;
  offset = 0;
  maxPageButtons = 9;
  showPrevNextButtons = true;
  showFirstLastButtons = true;
  displayFirstLastAsNumber = false;

  @computed('count', 'currentPage', 'maxPageButtons', 'pageCount', 'pageSize')
  get pages() {
    var result = [],
      pageCount = this.pageCount,
      currentPage = this.currentPage,
      maxPageButtons = this.maxPageButtons,
      length = pageCount >= maxPageButtons ? maxPageButtons : pageCount,
      startPos = 1;

    var offset = Math.floor(maxPageButtons / 2);

    if (pageCount >= currentPage) {
      startPos = currentPage - offset;
    }

    if (startPos + length >= pageCount) {
      startPos = pageCount - maxPageButtons + 1;
    }

    if (startPos < 1) {
      startPos = 1;
    }

    // Go through all of the pages and make an entry into the array
    for (var i = 0; i < length; i++) {
      var pageNum = i + startPos,
        isActive = pageNum === currentPage,
        page = { number: pageNum, active: isActive };

      result.push(page);
    }

    return result;
  }

  @computed('count', 'pageSize')
  get hideControl() {
    return this.count <= this.pageSize;
  }

  @computed('pageSize', 'count')
  get pageCount() {
    return Math.ceil(this.count / this.pageSize);
  }

  @computed('pages', 'displayFirstLastAsNumber', 'showFirstLastButtons')
  get hideFirst() {
    var pages = this.pages;
    var displayFirstLastAsNumber = this.displayFirstLastAsNumber;
    var showFirstLastButtons = this.showFirstLastButtons;
    return (
      showFirstLastButtons === false ||
      (displayFirstLastAsNumber && pages.findBy('number', 1))
    );
  }

  @computed(
    'pages',
    'pageCount',
    'displayFirstLastAsNumber',
    'showFirstLastButtons'
  )
  get hideLast() {
    var pages = this.pages;
    var displayFirstLastAsNumber = this.displayFirstLastAsNumber;
    var pageCount = this.pageCount;
    var showFirstLastButtons = this.showFirstLastButtons;
    return (
      showFirstLastButtons === false ||
      (displayFirstLastAsNumber && pages.findBy('number', pageCount))
    );
  }

  @computed('currentPage')
  get disablePrev() {
    return this.currentPage === 1;
  }

  @computed('currentPage', 'pageCount')
  get disableNext() {
    return this.currentPage === this.pageCount;
  }

  @action
  prev() {
    var newPage = this.currentPage - 1;
    if (newPage >= 1) {
      this.onPageSelect(this.currentPage - 1);
    }
  }

  @action
  next() {
    var newPage = this.currentPage + 1;
    if (newPage <= this.pageCount) {
      this.onPageSelect(this.currentPage + 1);
    }
  }

  @action
  gotoPage(page) {
    this.onPageSelect(page);
  }
}
