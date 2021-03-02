import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from '../helpers';
import { getPageTitle } from 'ember-page-title/test-support';

module('Acceptance | show', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting a show sets page title', async function (assert) {
    let publicSite = this.server.create('public-site');
    let channel = this.server.create('channel', {
      name: 'Default Channel Name',
      publicSite,
    });

    let show = this.server.create('show', {
      cgTitle: 'Cooking with cats, Episode 3',
    });

    await visit(`/show/${show.id}?channel=${channel.id}`);

    assert.equal(currentURL(), `/show/${show.id}?channel=${channel.id}`);

    assert.equal(
      getPageTitle(),
      'Cooking with cats, Episode 3',
      'Uses show cgTitle property as title'
    );
  });
});
