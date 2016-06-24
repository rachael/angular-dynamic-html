# angular-dynamic-html [![npm version](https://badge.fury.io/js/angular-dynamic-html.svg)](https://badge.fury.io/js/angular-dynamic-html) [![Build Status](https://travis-ci.org/rachael/angular-dynamic-html.svg?branch=master)](https://travis-ci.org/rachael/angular-dynamic-html)

A directive inspired by `ng-bind-html` that accepts uncompiled angular code in addition to raw html.

### Installation

Install via npm

```shell
npm install angular-dynamic-html
```

### Usage

In the template:
```html
<div dynamic-html='{{dynamicHtml}}'></div>
```

In the controller:
```javascript
$scope.dynamicHtml = "<span ng-bind-html='html'></span>";
$scope.html = "<h1>Expected Content</h1>";
```

Compiled result:
```html
<div dynamic-html="<span ng-bind-html='html'></span>">
    <span ng-bind-html="html">
        <h1>Expected Content</h1>
    </span>
</div>
```

### Development

Install Gulp via npm if you don't have it
```shell
npm install -g gulp
```

Install npm and bower dev dependencies
```shell
npm install
bower install
```

### Available commands

* `gulp`: build and test the project; equivalent to `gulp test`
* `gulp build`: build the project and make new files in `dist`
* `gulp serve`: start a server to serve the demo page and launch a browser then watches for changes in `src` files to reload the page
* `gulp test`: runs tests
* `gulp serve-test`: runs tests and keep test browser open for development. Watches for changes in source and test files to re-run the tests

### License
MIT
