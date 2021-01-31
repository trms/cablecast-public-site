'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');

module.exports = function(defaults) {

  var app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },
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

  let PDFJS = new Funnel('node_modules/pdfjs-dist/build',{
      srcDir: '/',
      include: ['pdf.js','pdf.worker.js'],
      destDir: '/assets'
  });

  let PDFJSExtras = new Funnel('node_modules/pdfjs-dist/web',{
      srcDir: '/',
      include: ['compatibility.js'],
      destDir: '/assets'
  });

  let PDFJSCmaps = new Funnel('node_modules/pdfjs-dist/cmaps',{
      srcDir: '/',
      include: ['**/*.bcmap'],
      destDir: '/assets/web/cmaps'
  });

  app.import('node_modules/pdfjs-dist/build/pdf.js', {
    using: [
      {
        transformation: 'fastbootShim'
      }
    ]
  });
  app.import('node_modules/pdfjs-dist/web/pdf_viewer.css');
  app.import('node_modules/pdfjs-dist/web/pdf_viewer.js', {
    using: [
      {
        transformation: 'fastbootShim'
      }
    ]
  });

  return app.toTree([scssFiles, PDFJS, PDFJSExtras, PDFJSCmaps]);

}
