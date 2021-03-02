import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from '../helpers';

module('Acceptance | podcasts', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /podcasts sets page title', async function (assert) {
    let publicSite = this.server.create('public-site');
    let channel = this.server.create('channel', {
      name: 'Default Channel Name',
      publicSite,
    });

    await visit(`/podcasts?channel=${channel.id}`);

    assert.equal(currentURL(), `/podcasts?channel=${channel.id}`);
    assert.equal(document.title, 'Podcasts');
  });
});
