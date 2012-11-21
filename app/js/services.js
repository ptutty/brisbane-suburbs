'use strict';

/* Services */

angular.module('suburbcatServices', ['ngResource']).
    factory('Suburb', function($resource){
  return $resource('suburbs/:suburbId.json', {}, {
    query: {method:'GET', params:{suburbId:'suburbs'}, isArray:true}
  });
});


// Service for cross controller communication of search query
/* App.factory('querySuburb', function() {  
    return {
        query : {
            name : "",
            time : 0,
        }
    };
}); */

// service for cross controller communication
App.factory('appServices', function() {  
    return {
        query : { // for suburb search filter sharing between controllers 
            name : "",
            time : 0
        },
        currentviews: { // for current view state sharing between controllers
           mainmap: true,
           suburbdetail: false,
           suburblisting: true      
        },
        suburbdetail: { // for current view state sharing between controllers
           current: ""     
        }
    };
});