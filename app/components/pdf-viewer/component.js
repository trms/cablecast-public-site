/* globals PDFJS */
import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    let url = this.get('url');
    let container = this.element.getElementsByClassName('pdf-wrapper')[0];
    let pdfLinkService = new PDFJS.PDFLinkService();

    let pdfViewer = new PDFJS.PDFViewer({
      container: container,
      linkService: pdfLinkService
    });
    window.viewer = pdfViewer;
    pdfLinkService.setViewer(pdfViewer);

    let pdfHistory = new PDFJS.PDFHistory({
      linkService: pdfLinkService
    });
    pdfLinkService.setHistory(pdfHistory);
    let pdfFindController = new PDFJS.PDFFindController({
      pdfViewer
    });
    pdfViewer.setFindController(pdfFindController);
    PDFJS.getDocument(url).then(function (pdf) {
      pdfViewer.setDocument(pdf).then(function() {
        pdfViewer.currentScaleValue = 'auto';
      });

      pdfLinkService.setDocument(pdf);
      pdfHistory.initialize(pdf.fingerprint);
    });
    this.set('pdfViewer', pdfViewer);
    Ember.$(window).on('resize.' + this.get('elementId'), this._handleResizeEvent.bind(this));
  },

  willDestroyElement: function() {
        this._super();
    Ember.$(window).off('resize.' + this.get('elementId'));

  },

  _handleResizeEvent() {
    Ember.run.debounce(this, this.rescalePdf, 150);
  },

  rescalePdf() {
    console.log('rescaling pdf...');
    this.get('pdfViewer').currentScaleValue = 'auto';
  }
});