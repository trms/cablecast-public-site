import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['query'],
    query: null,
    tempQuery: null,
    actions: {
        submitSearch: function (query){
          this.set('query', query);
        }
    }
});
