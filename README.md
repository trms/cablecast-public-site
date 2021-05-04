# Cablecast Public Site

The Cablecast Public Site is an Open Source web application that consumes the Cablecast API. It is included with Cablecast versions `6.0.0` and greater. We welcome community contributions, but please keep in mind that not all features will be accepted. We hope stations will fork this repository and customize this site to fit whatever needs they may have. Documentation and examples will be released soon, and this README will be updated with links to these resources.

If you have any problems with this application please use the GitHub issue tracker to file issues.

This application is written in the Ember JS javascript framework. Below are instructions for how to get started developing this application, as well as some useful links for getting started with Ember.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd my-project`
* `npm install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

Mirage does not work with fastboot, tests must be run with fastboot off. 

* `FASTBOOT_DISABLED=true ember test`
* `FASTBOOT_DISABLED=true ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
