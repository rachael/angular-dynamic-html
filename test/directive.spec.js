'use strict';

describe('dynamic-html', function () {
  var scope, $compile, $rootScope, element;

  function createDirective(template) {
    var elm;

    elm = angular.element(template);
    angular.element(document.body).prepend(elm);

    scope.htmlGenerator = () => { return "<h1>Expected Content</h1>"; };
    scope.dynamicHtml = "<div dynamic-html='htmlGenerator()'></div>";
    scope.console = console;

    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  beforeEach(module('ngSanitize', 'dynamicHtml'));
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  afterEach(function () {
    if (element) element.remove();
  });

  describe('as an attribute', function(){
    runTestsWithTemplate('<div ng-html="{{dynamicHtml}}"></div>');
  });

  function runTestsWithTemplate(template) {
    describe('when created', function () {

      it('should compile contents', function () {
        element = createDirective(template);

        console.log(element);

        expect(element.text()).toContain('Expected Content');
      });
    });
  }

});
