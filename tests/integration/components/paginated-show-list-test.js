import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paginated-show-list', 'Integration | Component | paginated show list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paginated-show-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paginated-show-list}}
      template block text
    {{/paginated-show-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
