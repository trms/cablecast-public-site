import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',
  total: 0,
  pageSize: 0,
  offset: 0,
  maxPageButtons: 9,
  showPrevNextButtons: true,
  showFirstLastButtons: true,
  displayFirstLastAsNumber: false,

  pages: computed('currentPage', 'pageSize', 'count', function () {
    var result = [],
      pageCount = this.pageCount,
      currentPage = this.currentPage,
      maxPageButtons = this.maxPageButtons,
      length = (pageCount >= maxPageButtons) ? maxPageButtons : pageCount,
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
        isActive = (pageNum === currentPage),
        page = { number: pageNum, active: isActive };

      result.push(page);
    }

    return result;

  }),

  hideControl: computed('count', 'pageSize', function () {
    return this.count <= this.pageSize;
  }),

  pageCount: computed('pageSize', 'count', function () {
    return Math.ceil(this.count / this.pageSize);
  }),

  hideFirst: computed('pages', 'displayFirstLastAsNumber', 'showFirstLastButtons', function () {
    var pages = this.pages;
    var displayFirstLastAsNumber = this.displayFirstLastAsNumber;
    var showFirstLastButtons = this.showFirstLastButtons;
    return showFirstLastButtons === false || (displayFirstLastAsNumber && pages.findBy('number', 1));
  }),

  hideLast: computed('pages', 'pageCount', 'displayFirstLastAsNumber', 'showFirstLastButtons', function () {
    var pages = this.pages;
    var displayFirstLastAsNumber = this.displayFirstLastAsNumber;
    var pageCount = this.pageCount;
    var showFirstLastButtons = this.showFirstLastButtons;
    return showFirstLastButtons === false || (displayFirstLastAsNumber && pages.findBy('number', pageCount));
  }),

  disablePrev: computed('currentPage', function () {
    return this.currentPage === 1;
  }),

  disableNext: computed('currentPage', 'pageCount', function () {
    return this.currentPage === this.pageCount;
  }),

  actions: {
    prev: function () {
      var newPage = this.currentPage - 1;
      if (newPage >= 1) {
        this.onPageSelect(this.currentPage - 1);
      }
    },

    next: function () {
      var newPage = this.currentPage + 1;
      if (newPage <= this.pageCount) {
        this.onPageSelect(this.currentPage + 1);
      }
    },

    gotoPage: function (page) {
      this.onPageSelect(page);
    }
  }
});
