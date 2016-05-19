import Ember from 'ember';

var chunkArray = function chunk(arr, n) {
    return arr.reduce(function(p, cur, i) {
        (p[i/n|0] = p[i/n|0] || []).push(cur);
        return p;
    },[]);
};

export default Ember.Component.extend({
	items: null,
	groups: Ember.computed('items.[]', 'media.isMd', {
	  get: function() {
	  	var columns = 2;

	  	if (this.get('media.isMd')) {
	  		columns = 4;
	  	}

	  	return chunkArray(this.get('items'), 4);
	  }
	})
});
