import classic from 'ember-classic-decorator';
/* globals PDFJS */
import { debounce } from '@ember/runloop';
import $ from 'jquery';
import Component from '@ember/component';

@classic
export default class PdfViewer extends Component {
  didInsertElement() {
    super.didInsertElement(...arguments);
    let url = this.url;
    let container = this.element.getElementsByClassName('pdf-wrapper')[0];
    let pdfLinkService = new PDFJS.PDFLinkService();

    let pdfViewer = new PDFJS.PDFViewer({
      container: container,
      linkService: pdfLinkService,
    });
    window.viewer = pdfViewer;
    pdfLinkService.setViewer(pdfViewer);

    let pdfHistory = new PDFJS.PDFHistory({
      linkService: pdfLinkService,
    });
    pdfLinkService.setHistory(pdfHistory);
    let pdfFindController = new PDFJS.PDFFindController({
      pdfViewer,
    });
    pdfViewer.setFindController(pdfFindController);
    PDFJS.getDocument(url).then(function (pdf) {
      pdfViewer.setDocument(pdf).then(function () {
        pdfViewer.currentScaleValue = 'auto';
      });

      pdfLinkService.setDocument(pdf);
      pdfHistory.initialize(pdf.fingerprint);
    });
    this.set('pdfViewer', pdfViewer);
    $(window).on(
      'resize.' + this.elementId,
      this._handleResizeEvent.bind(this)
    );
  }

  willDestroyElement() {
    super.willDestroyElement();
    $(window).off('resize.' + this.elementId);
  }

  _handleResizeEvent() {
    debounce(this, this.rescalePdf, 150);
  }

  rescalePdf() {
    this.pdfViewer.currentScaleValue = 'auto';
  }
}
