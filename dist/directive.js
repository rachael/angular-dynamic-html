/*!
 * angular-dynamic-html
 * 
 * Version: 0.0.8 - 2016-06-16T22:11:27.335Z
 * License: MIT
 */
"use strict";angular.module("dynamicHtml",[]).directive("dynamicHtml",["$compile",function($compile){return{restrict:"A",replace:!0,link:function(scope,ele,attrs){var compileHtml=function(){ele.html(attrs.dynamicHtml),$compile(ele.contents())(scope)};compileHtml(),scope.$on("updateDynamicHtml",function(){compileHtml()})}}}]);