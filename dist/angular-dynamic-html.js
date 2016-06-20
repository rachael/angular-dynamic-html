/*!
 * angular-dynamic-html
 * 
 * Version: 1.0.0 - 2016-06-20T16:37:59.012Z
 * License: MIT
 */

'use strict';

/**
 * @ngdoc directive
 * @name dynamicHtml.directive:dynamicHtml
 * @restrict A
 * @param {(string|Object)} dynamic-html An expression that evaluates to a valid
 * html string or object returned from a call to $sce.trustAs. Must be wrapped
 * in Angular's double curly brace notation.
 *
 * @description
 * A simple directive that will take an expression that evaluates to html as an
 * attribute, replace its contents with said html, and then run an angular
 * $compile. It was written for use with functions that return dynamically
 * generated html containing other directives which would not be compiled by,
 * for example, ng-bind-html.
 *
 * @example
   <div dynamic-html="{{varContainingHtmlString}}"></div>
   <div dynamic-html="{{funcThatReturnsHtml()}}"></div>
 */

angular.module('dynamicHtml', []).directive('dynamicHtml', ["$compile", function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function link(scope, ele, attrs) {
      var compileHtml = function compileHtml() {
        ele.html(attrs.dynamicHtml);
        $compile(ele.contents())(scope);
      };
      compileHtml();
      scope.$on('updateDynamicHtml', function () {
        compileHtml();
      });
    }
  };
}]);