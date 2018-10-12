import { module, test } from 'qunit';
import { visit, currentRouteName, click, findAll, waitFor, find} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | active-link', function(hooks) {
  setupApplicationTest(hooks);


  test('component should show correct active state', async function(assert) {
    await visit('/');

    assert.equal(currentRouteName(), 'index');
    assert.equal(findAll('#index-link li.active').length, 1);
    assert.equal(findAll('#index-link li.active a.active').length, 1);
    assert.equal(findAll('#other-link li.active').length, 0);
    assert.equal(findAll('#other-link li.active a.active').length, 0);

    await click('#other-link a');

    assert.equal(currentRouteName(), 'other');
    assert.equal(findAll('#index-link li.active').length, 0);
    assert.equal(findAll('#index-link li.active a.active').length, 0);
    assert.equal(findAll('#other-link li.active').length, 1);
    assert.equal(findAll('#other-link li.active a.active').length, 1);
  });

  test('component should show correct disabled state', async function(assert) {
    await visit('/');

    assert.equal(currentRouteName(), 'index');
    assert.equal(findAll('#index-link-disabled li.disabled').length, 1);
  });

  test('changed active class should be applied to the proper elements', async function(assert) {
    await visit('/');

    assert.equal(currentRouteName(), 'index');
    assert.equal(findAll('#linkto-active-class li.enabled').length, 1);
    assert.equal(findAll('#linkto-active-class a.enabled').length, 1);
    assert.equal(findAll('#activelink-active-class li.enabled').length, 1);
    assert.equal(findAll('#activelink-active-class a.active').length, 1);
  });

  test('changed disabled class should be applied to the proper elements', async function(assert) {
    await visit('/');

    assert.equal(currentRouteName(), 'index');
    assert.equal(findAll('#linkto-disabled-class li.inactive').length, 1);
    assert.equal(findAll('#linkto-disabled-class a.inactive').length, 1);
    assert.equal(findAll('#activelink-disabled-class li.inactive').length, 1);
    assert.equal(findAll('#activelink-disabled-class a.disabled').length, 1);
  });

  test('change the linkSelector to look for a button', async function(assert) {
    await visit('/');

    assert.equal(currentRouteName(), 'index');
    assert.equal(findAll('#button-links li.active').length, 1);
    assert.equal(findAll('#button-links li.active button.active').length, 1);
  });

  test('transitioning in and out classes', async function(assert) {
    await visit('/');

    click('#other-link a');

    await waitFor('#other-link li.ember-transitioning-in');
    assert.ok(find('#index-link li.ember-transitioning-out'));
  });
});

