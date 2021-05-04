import { setupApplicationTest as _setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

export function setupApplicationTest(hooks) {
  _setupApplicationTest(hooks);
  setupMirage(hooks);
}
