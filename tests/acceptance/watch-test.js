import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from '../helpers';

module('Acceptance | watch', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /watch sets the page title', async function (assert) {
    let publicSite = this.server.create('public-site');
    let channel = this.server.create('channel', {
      name: 'Default Channel Name',
      publicSite,
    });

    let stream = this.server.create('live-stream', {
      name: 'Puppies, good or bad?',
    });

    await visit(`/watch/${stream.id}?channel=${channel.id}`);

    assert.equal(currentURL(), `/watch/${stream.id}?channel=${channel.id}`);
    assert.equal(
      document.title,
      'Puppies, good or bad?',
      'Watch stream sets the title to the name property of the live stream'
    );
  });
});
