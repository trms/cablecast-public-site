import RESTSerializer, { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default RESTSerializer.extend(EmbeddedRecordsMixin, {
  isNewSerializerAPI: true,
	attrs: {
    fieldDisplays: {embedded: 'always'}
  }
});