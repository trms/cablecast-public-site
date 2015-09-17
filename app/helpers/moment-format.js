/*globals moment*/
import Ember from 'ember';

function momentFormat(date, format) {
  var formatString = arguments.length < 3 ?
  					'MMMM Do YYYY, h:mm:ss a' :
  					format;
  return moment(date).format(formatString);
}

export {
  momentFormat
};

export default Ember.Handlebars.makeBoundHelper(momentFormat);
