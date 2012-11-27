'use strict';

/* Filters */


var subcatfilters = angular.module('suburbcatFilters', []);


subcatfilters.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  } 
});