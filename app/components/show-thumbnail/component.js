import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';

@classic
@tagName('')
export default class ShowThumbnail extends Component {
    quality = 'Small';

    @alias('thumbnailPath')
    src;

    show = null;

    @computed('show.showThumbnails.@each.quality', 'quality')
    get thumbnailPath() {
        var thumbnail = this.get('show.showThumbnails').findBy('quality', this.quality);

        // If we can't find the specifiec quality default to first thumbnail
        if (!thumbnail) {
            thumbnail = this.get('show.showThumbnails.firstObject');
        }

        // If we have a thumbnail return the url.
        return thumbnail.get('url');
    }
}
