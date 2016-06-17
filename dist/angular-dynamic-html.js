/*!
 * angular-dynamic-html
 * 
 * Version: 1.0.0 - 2016-06-17T20:40:45.096Z
 * License: MIT
 */

'use strict';

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