import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting / sets page title', async function (assert) {
    let publicSite = this.server.create('public-site');
    this.server.create('channel', {
      name: 'Default Channel Name',
      primaryLocation: 1,
      publicSite,
    });

    await visit('/');

    assert.equal(currentURL(), '/');
    assert.equal(document.title, 'Default Channel Name');
  });
});
