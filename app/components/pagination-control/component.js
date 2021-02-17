import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  total: 0,
  pageSize: 0,
  offset: 0,
  maxPageButtons: 9,
  showPrevNextButtons: true,
  showFirstLastButtons: true,
  displayFirstLastAsNumber: false,

  pages: computed('currentPage', 'pageSize', 'count', function () {
    var result = [],
      pageCount = this.get('pageCount'),
      currentPage = this.get('currentPage'),
      maxPageButtons = this.get('maxPageButtons'),
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
    return this.get('count') <= this.get('pageSize');
  }),

  pageCount: computed('pageSize', 'count', function () {
    return Math.ceil(this.get('count') / this.get('pageSize'));
  }),

  hideFirst: computed('pages', 'displayFirstLastAsNumber', 'showFirstLastButtons', function () {
    var pages = this.get('pages');
    var displayFirstLastAsNumber = this.get('displayFirstLastAsNumber');
    var showFirstLastButtons = this.get('showFirstLastButtons');
    return showFirstLastButtons === false || (displayFirstLastAsNumber && pages.findBy('number', 1));
  }),

  hideLast: computed('pages', 'pageCount', 'displayFirstLastAsNumber', 'showFirstLastButtons', function () {
    var pages = this.get('pages');
    var displayFirstLastAsNumber = this.get('displayFirstLastAsNumber');
    var pageCount = this.get('pageCount');
    var showFirstLastButtons = this.get('showFirstLastButtons');
    return showFirstLastButtons === false || (displayFirstLastAsNumber && pages.findBy('number', pageCount));
  }),

  disablePrev: computed('currentPage', function () {
    return this.get('currentPage') === 1;
  }),

  disableNext: computed('currentPage', 'pageCount', function () {
    return this.get('currentPage') === this.get('pageCount');
  }),

  actions: {
    prev: function () {
      var newPage = this.get('currentPage') - 1;
      if (newPage >= 1) {
        this.sendAction('on-page-select', this.get('currentPage') - 1);
      }
    },

    next: function () {
      var newPage = this.get('currentPage') + 1;
      if (newPage <= this.get('pageCount')) {
        this.sendAction('on-page-select', this.get('currentPage') + 1);
      }
    },

    gotoPage: function (page) {
      this.sendAction('on-page-select', page);
    }
  }
});
