import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from '../helpers';
import { getPageTitle } from 'ember-page-title/test-support';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting / sets page title', async function (assert) {
    let publicSite = this.server.create('public-site');
    this.server.create('channel', {
      name: 'Default Channel Name',
      publicSite,
    });

    this.server.create('channel', {
      name: 'Alternate Channel Name',
      publicSite,
    });

    await visit('/');

    assert.equal(currentURL(), '/');

    assert.equal(
      getPageTitle(),
      'Default Channel Name',
      'Defaults to first channel and uses channel name as title'
    );
  });
});
