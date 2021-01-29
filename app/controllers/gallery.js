import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
    queryParams: ['page'],
    page: 1,

    meta: alias('model.shows.meta'),



    actions: {
      submitSearch: function (query){
        this.set('query', query);
      },
      goToPage: function(page) {
        this.set('page', page);
      }
    },
});
