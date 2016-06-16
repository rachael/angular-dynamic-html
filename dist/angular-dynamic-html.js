/*!
 * angular-dynamic-html
 * 
 * Version: 0.0.8 - 2016-06-16T22:56:13.244Z
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