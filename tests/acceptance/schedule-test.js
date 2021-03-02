import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from '../helpers';
import { getPageTitle } from 'ember-page-title/test-support';

module('Acceptance | schedule', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /schedule sets page title', async function (assert) {
    let publicSite = this.server.create('public-site');
    let channel = this.server.create('channel', {
      name: 'Default Channel Name',
      publicSite,
    });

    await visit(`/schedule?channel=${channel.id}`);

    assert.equal(currentURL(), `/schedule?channel=${channel.id}`);
    assert.equal(getPageTitle(), 'Schedule');
  });
});
