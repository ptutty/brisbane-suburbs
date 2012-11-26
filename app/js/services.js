'use strict';

/* Services */

angular.module('suburbcatServices', ['ngResource']).
    factory('Suburb', function($resource){
  return $resource('suburbs/:suburbId.json', {}, {
    query: {method:'GET', params:{suburbId:'suburbs'}, isArray:true}
  });
});


// service for cross controller communication

App.factory('appServices', function() {  
    return { 
        filter: { // shares a model current filters on suburbs across suburblist and mainmap controllers
          name: "",
          traveltimes: {
              "stlucia": 0, 
              "herston": 0
          } 
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

