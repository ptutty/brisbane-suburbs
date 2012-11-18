'use strict';

/* Services */

angular.module('suburbcatServices', ['ngResource']).
    factory('Suburb', function($resource){
  return $resource('suburbs/:suburbId.json', {}, {
    query: {method:'GET', params:{suburbId:'suburbs'}, isArray:true}
  });
});


// Service for cross controller communication of search query
App.factory('querySuburb', function() {  
    return {
        query : {
            name : "",
            time : null
        }
    };
});