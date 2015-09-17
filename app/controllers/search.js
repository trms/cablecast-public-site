import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['query', 'page'],
    page: 1,
    query: null,
    tempQuery: null,

    firstResult: Ember.computed('page', 'model.meta.offset', 'model.meta.pageSize', function() {
      return 1 + (this.get('model.meta.offset') * this.get('model.meta.pageSize'));
    }),

    lastResult: Ember.computed('page', 'model.meta.offset', 'model.meta.pageSize', function() {
      var total = this.get('model.meta.count');
      var last = (this.get('model.meta.offset') * this.get('model.meta.pageSize')) + this.get('model.meta.pageSize');
      return Math.min(last, total);
    }),

    actions: {
        submitSearch: function (query){
          this.set('query', query);
        },
        gotoPage: function(page) {
          this.set('page', page);
        }
    },
});
