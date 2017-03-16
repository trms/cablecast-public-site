import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['query', 'page'],
    page: 1,
    query: null,
    tempQuery: null,

    meta: Ember.computed.alias('model.meta'),

    firstResult: Ember.computed('page', 'meta.offset', 'meta.pageSize', function() {
      return 1 + (this.get('meta.offset') * this.get('meta.pageSize'));
    }),

    lastResult: Ember.computed('page', 'meta.offset', 'meta.pageSize', function() {
      var total = this.get('meta.count');
      var last = (this.get('meta.offset') * this.get('meta.pageSize')) + this.get('meta.pageSize');
      return Math.min(last, total);
    }),

    actions: {
      submitSearch: function (query){
        this.set('query', query);
      },
      goToPage: function(page) {
        this.set('page', page);
      }
    },
});
