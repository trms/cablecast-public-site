import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
    queryParams: ['query', 'page'],
    page: 1,
    query: null,
    tempQuery: null,

    meta: alias('model.meta'),

    firstResult: computed('page', 'meta.{offset,pageSize}', function() {
      return 1 + (this.get('meta.offset') * this.get('meta.pageSize'));
    }),

    lastResult: computed('page', 'meta.{offset,pageSize}', function() {
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
