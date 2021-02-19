import classic from 'ember-classic-decorator';
import RESTSerializer, {
  EmbeddedRecordsMixin,
} from '@ember-data/serializer/rest';

const attrs = {
  fieldDisplays: { embedded: 'always' },
};

@classic
export default class PublicSite extends RESTSerializer.extend(
  EmbeddedRecordsMixin
) {
  isNewSerializerAPI = true;
  attrs = attrs;
}
