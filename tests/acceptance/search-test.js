import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from '../helpers';

module('Acceptance | search', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /search sets page title', async function (assert) {
    let publicSite = this.server.create('public-site');
    let channel = this.server.create('channel', {
      name: 'Default Channel Name',
      publicSite,
    });

    await visit(`/search?channel=${channel.id}&query=corvette`);

    assert.equal(currentURL(), `/search?channel=${channel.id}&query=corvette`);
    assert.equal(document.title, 'Search Results');
  });
});
