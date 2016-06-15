'use strict';

angular.module('dynamicHtml', []).directive('dynamicHtml', function dynamicHtml($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.console.log('link', scope);
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
});
