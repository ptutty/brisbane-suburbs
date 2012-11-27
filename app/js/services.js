'use strict';

/* Services */

// service module
var subcatservices = angular.module('suburbcatServices', ['ngResource']);

// service:

// does the ajax calls
subcatservices.factory('Suburb', function($resource){
  return $resource('suburbs/:suburbId.json', {}, {
    query: {method:'GET', params:{suburbId:'suburbs'}, isArray:true}
  });
});    


// service for cross controller communication of state, data, views etc
subcatservices.factory('appServices', function() {  
    return { 
        filter: { // shares a model current filters on suburbs across suburblist and mainmap controllers
          name: "",
          traveltimes: {
              "stlucia": 0, 
              "herston": 0
          } 
        },  
        currentview: "home", // for current view state sharing between controller    
        suburbdetail: { // for current view state sharing between controllers
           current: ""     
        }
    };
});


// for managing favourites
subcatservices.factory('Favourites', function() {
  return {
          favlist: [],
          updatefavlist: function(url, name) {
            this.favlist.push({"name": name, "url": url});
          },
          checkfavlist: function(url) {
            if (!this.favlist.length) {return false}
             else { 
              for (var i = 0; i < this.favlist.length; i++) {
                if (url == this.favlist[i].url) {
                  console.log("item already exists");
                  return true; } 
                else { 
                  return false;
                };
              };
             } 
          },
          removeitem: function() {

          }
  }
})