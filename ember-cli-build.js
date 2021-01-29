'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');

module.exports = function(defaults) {

  var app = new EmberApp(defaults, {
    fingerprint: {
      exclude: ['pdf.worker.js']
    },
  	svg: {
  		paths: [
  			'public/svg'
  		]
  	}
  });

  var scssFiles = new Funnel('app/styles', {
  	srcDir: '/',
  	include: ['colors.scss', 'color-definitions.scss'],
  	destDir: '/scss-files'
  });


  return app.toTree([scssFiles]);

}
