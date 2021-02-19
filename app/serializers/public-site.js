import RESTSerializer, { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

const attrs = {
  fieldDisplays: {embedded: 'always'}
};

export default RESTSerializer.extend(EmbeddedRecordsMixin, {
  isNewSerializerAPI: true,
	attrs
});