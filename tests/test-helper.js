import Application from 'cablecast-public-site/app';
import config from 'cablecast-public-site/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
