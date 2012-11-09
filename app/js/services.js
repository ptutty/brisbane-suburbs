'use strict';

/* Services */

angular.module('suburbcatServices', ['ngResource']).
    factory('Suburb', function($resource){
  return $resource('suburbs/:suburbId.json', {}, {
    query: {method:'GET', params:{suburbId:'suburbs'}, isArray:true}
  });
});
