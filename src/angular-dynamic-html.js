'use strict';

angular.module('dynamicHtml', [])
.directive('dynamicHtml', ["$compile", function($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      let compileHtml = () => {
        ele.html(attrs.dynamicHtml);
        $compile(ele.contents())(scope);
      };
      compileHtml();
      scope.$on('updateDynamicHtml', () => {
        compileHtml();
      });
    }
  };
}]);
