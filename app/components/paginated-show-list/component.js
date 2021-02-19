import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  offset: computed('page', 'pageSize', function() {
    return (this.page - 1) * this.pageSize;
  }),
  firstResult: computed('offset', 'pageSize', function() {
    return 1 + this.offset;
  }),

  lastResult: computed('offset', 'pageSize', 'total', function() {
    var total = this.total;
    var last = (this.offset * this.pageSize) + this.pageSize;
    return Math.min(last, total);
  }),

  showPaginationControl: computed('total', 'pageSize', function(){
    return this.total > this.pageSize;
  }),

  actions:{
    _goToPage(page){
      this.goToPage(page);
    }
  }
});
