/* globals PDFJS */
import ENV from 'cablecast-public-site/config/environment';

export default {
  name: 'init-pdfjs-workersrc',
  initialize: function () {
    if (typeof PDFJS !== 'undefined') {
      if (false /*ENV.environment === 'production'*/) {
        PDFJS.workerSrc = '/CablecastPublicSite/assets/pdf.worker.js';
      } else {
        PDFJS.workerSrc = '/assets/pdf.worker.js';
      }
    }
  },
};
