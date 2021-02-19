import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import jQuery from 'jquery';
import Component from '@ember/component';

@classic
@tagName('')
export default class ShowCarousel extends Component {
  @service
  fastboot;

  didInsertElement() {
    jQuery('#carousel').carousel('cycle');
  }
}
