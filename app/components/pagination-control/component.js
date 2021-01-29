import Component from '@ember/component';

export default Component.extend({
  total: 0,
  pageSize: 0,
  offset: 0,
  maxPageButtons: 9,
  showPrevNextButtons: true,
  showFirstLastButtons: true,
  displayFirstLastAsNumber: false,

  pages: function() {
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
          page = {number: pageNum, active:isActive};

      result.push(page);
    }

    return result;

  }.property('currentPage', 'pageSize', 'count'),

  hideControl: function() {
    return this.get('count') <= this.get('pageSize');
  }.property('count', 'pageSize'),

  pageCount: function() {
    return Math.ceil(this.get('count') / this.get('pageSize'));
  }.property('pageSize', 'count'),

  hideFirst: function() {
    var pages = this.get('pages');
    var displayFirstLastAsNumber = this.get('displayFirstLastAsNumber');
    var showFirstLastButtons = this.get('showFirstLastButtons');
    return showFirstLastButtons === false || (displayFirstLastAsNumber && pages.findBy('number', 1));
  }.property('pages', 'displayFirstLastAsNumber', 'showFirstLastButtons'),

  hideLast: function() {
    var pages = this.get('pages');
    var displayFirstLastAsNumber = this.get('displayFirstLastAsNumber');
    var pageCount = this.get('pageCount');
    var showFirstLastButtons = this.get('showFirstLastButtons');
    return showFirstLastButtons === false|| (displayFirstLastAsNumber && pages.findBy('number', pageCount));
  }.property('pages', 'pageCount', 'displayFirstLastAsNumber', 'showFirstLastButtons'),

  disablePrev: function () {
    return this.get('currentPage') === 1;
  }.property('currentPage'),

  disableNext: function () {
    return this.get('currentPage') === this.get('pageCount');
  }.property('currentPage', 'pageCount'),

  actions: {
    prev: function() {
      var newPage = this.get('currentPage') - 1;
      if (newPage >= 1) {
        this.sendAction('on-page-select', this.get('currentPage') - 1);
      }
    },

    next: function() {
      var newPage = this.get('currentPage') + 1;
      if (newPage <= this.get('pageCount')) {
        this.sendAction('on-page-select', this.get('currentPage') + 1);
      }
    },

    gotoPage: function(page) {
      this.sendAction('on-page-select', page);
    }
  }
});
