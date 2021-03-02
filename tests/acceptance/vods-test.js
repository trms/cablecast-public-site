import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from '../helpers';

module('Acceptance | vods', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /vods sets page title', async function (assert) {
    let publicSite = this.server.create('public-site');
    let channel = this.server.create('channel', {
      name: 'Default Channel Name',
      publicSite,
    });

    await visit(`/vods?channel=${channel.id}`);

    assert.equal(currentURL(), `/vods?channel=${channel.id}`);
    assert.equal(document.title, 'Vods');
  });
});
