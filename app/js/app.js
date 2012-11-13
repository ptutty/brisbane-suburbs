'use strict';

/* App Module */

var App = angular.module('suburbcat', ['suburbcatFilters', 'suburbcatServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/suburbs', {templateUrl: 'partials/overview.html'}).
      when('/suburbs/:suburbId', {templateUrl: 'partials/suburb-detail.html', controller: SuburbDetailCtrl}).
      otherwise({redirectTo: '/suburbs'});
}]);
