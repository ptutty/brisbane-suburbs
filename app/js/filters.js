'use strict';

/* Filters */

angular.module('suburbcatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  } 
});