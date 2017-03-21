import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['page'],
    page: 1,

    meta: Ember.computed.alias('model.shows.meta'),



    actions: {
      submitSearch: function (query){
        this.set('query', query);
      },
      goToPage: function(page) {
        this.set('page', page);
      }
    },
});
