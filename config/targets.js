'use strict';

const browsers = [
  'last 1 Chrome versions',
  'last 1 Firefox versions',
  'last 1 Safari versions',
];

const isCI = Boolean(process.env.CI);
const isProduction = process.env.EMBER_ENV === 'production';

if (isCI || isProduction) {
  browsers.push('ie 11');
}

// Per https://github.com/emberjs/ember.js/issues/19353 Can be reverted to blueprint in `ember-source` >= 3.26 or when backported
module.exports = [...browsers, 'maintained node versions'];
