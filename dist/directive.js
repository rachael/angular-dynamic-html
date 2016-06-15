/*!
 * angular-dynamic-html
 * 
 * Version: 0.0.8 - 2016-06-15T21:49:25.510Z
 * License: MIT
 */
"use strict";angular.module("dynamicHtml",[]).directive("dynamicHtml",function(n){return{restrict:"A",replace:!0,link:function(t,c,i){t.console.log("link",t);var l=function(){c.html(i.dynamicHtml),n(c.contents())(t)};l(),t.$on("updateDynamicHtml",function(){l()})}}});