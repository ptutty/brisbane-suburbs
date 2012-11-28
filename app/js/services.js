'use strict';

/* Services */

// service module
var subcatservices = angular.module('suburbcatServices', ['ngResource']);


// does the ajax calls
subcatservices.factory('Suburb', function($resource){
  return $resource('suburbs/:suburbId.json', {}, {
    query: {method:'GET', params:{suburbId:'suburbs'}, isArray:true}
  });
});    


/* services for cross controller communication of state, data, views etc  */


// shares a model current filters on suburbs across suburblist and mainmap controllers
subcatservices.factory('appServices', function() {  
    return { 
        filter: { 
          name: "",
          traveltimes: {
              "stlucia": 0, 
              "herston": 0
          } 
        }
    };
});

// for tracking current view 
subcatservices.factory('State', function() {  
  return {  
    currentview: "home",
    buttonstate: function() {
      if (this.currentview == "home") {
        return {"mainmap": false ,"showfavourites": true, "addfavourites": false};
      } else if (this.currentview == "detailed") {
        return  {"mainmap": true ,"showfavourites": true , "addfavourites": true};
      } else if (this.currentview == "favourites") {
        return  {"mainmap": true ,"showfavourites": false , "addfavourites": false};
      } 
    } 
  }    
});



// for managing favourites
subcatservices.factory('Favourites', function($location) {
  return {
          currenturl: function (){ return $location.path();},
          currentsuburb: "",
          favlist: [],
          updatefavlist: function() {
             if (!this.checkfavlist(this.currenturl())) {
                this.favlist.push({"name": this.currentsuburb, "url": this.currenturl(), "done": false});
             } 
          },
          checkfavlist: function(currenturl) { // returns false if not currently in favlist array
            console.log("checklist" + this.favlist.length);
              angular.forEach(this.favlist, function(fav) {
                if (fav.url == currenturl) { return true; } else {return false;};
              });
          },
          removeitem: function() {

          }
  }
})