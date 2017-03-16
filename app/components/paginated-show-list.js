import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['paginated-show-list'],

  firstResult: Ember.computed('page', 'meta.offset', 'meta.pageSize', function() {
    return 1 + (this.get('meta.offset') * this.get('meta.pageSize'));
  }),

  lastResult: Ember.computed('page', 'meta.offset', 'meta.pageSize', function() {
    var total = this.get('meta.count');
    var last = (this.get('meta.offset') * this.get('meta.pageSize')) + this.get('meta.pageSize');
    return Math.min(last, total);
  }),

  showPaginationControl: Ember.computed('meta.count', 'meta.pageSize',function(){
    return this.get('meta.count') > this.get('meta.pageSize');
  }),

  actions:{
    goToPage(page){
      this.attrs.goToPage(page);
    }
  }
});
