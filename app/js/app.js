  'use strict';

/* App Module */

var suburbcatapp = angular.module('suburbcat', ['suburbcatFilters', 'suburbcatServices', 'suburbcatDirectives']);


suburbcatapp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/suburbs', {templateUrl: 'partials/mainmap.html' , controller: SuburbMainMapCtrl}).
      when('/suburbs/:suburbId', {templateUrl: 'partials/suburb-detail.html', controller: SuburbDetailCtrl}).
      when('/favourites', {templateUrl: 'partials/suburb-favourites.html', controller: SuburbFavouritesCtrl}).
      otherwise({redirectTo: '/suburbs'});
}]);



