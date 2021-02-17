import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['paginated-show-list'],
  offset: computed('page', 'pageSize', function() {
    return (this.get('page') - 1) * this.get('pageSize');
  }),
  firstResult: computed('offset', 'pageSize', function() {
    return 1 + this.get('offset');
  }),

  lastResult: computed('offset', 'pageSize', 'total', function() {
    var total = this.get('total');
    var last = (this.get('offset') * this.get('pageSize')) + this.get('pageSize');
    return Math.min(last, total);
  }),

  showPaginationControl: computed('total', 'pageSize', function(){
    return this.get('total') > this.get('pageSize');
  }),

  actions:{
    goToPage(page){
      this.goToPage(page);
    }
  }
});
