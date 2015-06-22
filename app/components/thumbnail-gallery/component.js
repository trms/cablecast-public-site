import Ember from 'ember';

var chunkArray = function chunk(arr, n) {
    return arr.reduce(function(p, cur, i) {
        (p[i/n|0] = p[i/n|0] || []).push(cur);
        return p;
    },[]);
}

export default Ember.Component.extend({
	items: null,
	columns: 4,
	groups: Ember.computed('items.[]', 'columns', {
	  get: function() {
	  	return chunkArray(this.get('items'), this.get('columns'));
	  }
	})
});