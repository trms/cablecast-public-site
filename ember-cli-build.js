var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

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

  var PDFJS = new Funnel('bower_components/pdfjs-dist/build',{
      srcDir: '/',
      include: ['pdf.js','pdf.worker.js'],
      destDir: '/assets'
  });

  var PDFJSExtras = new Funnel('bower_components/pdfjs-dist/web',{
      srcDir: '/',
      include: ['compatibility.js'],
      destDir: '/assets'
  });

  var PDFJSCmaps = new Funnel('bower_components/pdfjs-dist/cmaps',{
      srcDir: '/',
      include: ['**/*.bcmap'],
      destDir: '/assets/web/cmaps'
  });


  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', {
      destDir: 'assets'
  });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot', {
      destDir: 'fonts'
  });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', {
      destDir: 'fonts'
  });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg', {
      destDir: 'fonts'
  });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
      destDir: 'fonts'
  });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', {
      destDir: 'fonts'
  });

  if (!process.env.EMBER_CLI_FASTBOOT) {
    app.import('bower_components/bootstrap/dist/js/bootstrap.js');
    app.import('bower_components/pdfjs-dist/build/pdf.js');
    app.import('bower_components/pdfjs-dist/web/pdf_viewer.css');
    app.import('bower_components/pdfjs-dist/web/pdf_viewer.js');
  }

  app.import('bower_components/moment/moment.js');


  return app.toTree([scssFiles, PDFJS, PDFJSExtras, PDFJSCmaps]);
};
