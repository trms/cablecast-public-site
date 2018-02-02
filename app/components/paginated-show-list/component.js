import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['paginated-show-list'],
  offset: Ember.computed('page', 'pageSize', function() {
    return (this.get('page') - 1) * this.get('pageSize');
  }),
  firstResult: Ember.computed('offset', 'pageSize', function() {
    return 1 + this.get('offset');
  }),

  lastResult: Ember.computed('offset', 'pageSize', 'total', function() {
    var total = this.get('total');
    var last = (this.get('offset') * this.get('pageSize')) + this.get('pageSize');
    return Math.min(last, total);
  }),

  showPaginationControl: Ember.computed('total', 'pageSize', function(){
    return this.get('total') > this.get('pageSize');
  }),

  actions:{
    goToPage(page){
      this.attrs.goToPage(page);
    }
  }
});
