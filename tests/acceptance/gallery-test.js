import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from '../helpers';

module('Acceptance | gallery', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /gallery sets page title', async function (assert) {
    let savedShowSearch = this.server.create('saved-show-search');
    let publicSite = this.server.create('public-site');
    let channel = this.server.create('channel', {
      name: 'Default Channel Name',
      publicSite,
    });
    let gallery = this.server.create('site-gallery', { savedShowSearch });

    await visit(`/gallery/${gallery.id}?channel=${channel.id}`);

    assert.equal(currentURL(), `/gallery/${gallery.id}?channel=${channel.id}`);
    assert.equal(
      document.title,
      'Default Channel Name',
      'Page title is channel title on gallery'
    );
  });
});
