'use strict';

/* App Module */

angular.module('suburbcat', ['suburbcatFilters', 'suburbcatServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/suburbs', {templateUrl: 'partials/overview.html',   controller: OverviewCtrl}).
      when('/suburbs/:suburbId', {templateUrl: 'partials/suburb-detail.html', controller: SuburbDetailCtrl}).
      otherwise({redirectTo: '/suburbs'});
}]);
