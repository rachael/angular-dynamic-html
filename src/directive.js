'use strict';

console.log('wooooooooo----------------! 1');

angular.module('dynamicHtml', [])
.directive('dynamicHtml', ["$compile", function($compile) {
  console.log('wooooooooo----------------! 2');
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      throw new Error("in link function");
      console.log('in link function');
      console.log(scope, ele, attrs);
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
