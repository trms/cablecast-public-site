import Ember from 'ember';

var chunkArray = function chunk(arr, n) {
    return arr.reduce(function(p, cur, i) {
        (p[i/n|0] = p[i/n|0] || []).push(cur);
        return p;
    },[]);
};

export default Ember.Component.extend({
	items: null,
	groups: Ember.computed('items.[]', {
	  get: function() {
	  	return chunkArray(this.get('items'), 4);
	  }
	})
});
