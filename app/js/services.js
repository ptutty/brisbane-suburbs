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
subcatservices.factory('Subfilter', function() {  
    return { 
        name: "",
        traveltimes: {
            "stlucia": 0, 
            "herston": 0
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

  var favourites = {
          currentsuburb: "",
          list: [],
          add: function() { 
           if (this.match()) {
              this.list.push({"name": this.currentsuburb, "url": $location.path(), "done": false});
           }
           this.localstorage.save();
          },
          match: function() {
            var found = true;
            angular.forEach(this.list, function(item) {
              if (item.url == $location.path()) {found = false};
            }); 
            return found;
          },
          length: function() { // checks if array is empty
            if (this.list.length !== 0) { return true }
          },
          remove: function() {
              var oldlist = this.list;
              var newlist = [];
              angular.forEach(oldlist, function(olditem){
                if (!olditem.done) {newlist.push(olditem)}
              })
              this.list = newlist; 
              this.localstorage.save();
          },
          localstorage: {   // persistence of favourites using HTML storage
            notloaded: true, // load locally stored data once              
            test: function()  { // test for web storage ability using modernizr
              if (Modernizr.localstorage) {
              return true;
              } else {
          // no native support for HTML5 storage :(
              return false;
              }
            }, 
            save: function() {
              if (this.test()) { 
                localStorage.setItem("suburbfavourites", "");
                localStorage.setItem("suburbfavourites", angular.toJson(favourites.list));
              }; 
            },
            read: function(){
              if (this.test() && this.notloaded) { 
                favourites.list  = angular.fromJson(localStorage.getItem("suburbfavourites"));
                this.notloaded = false;
              }
            }
          }
      }
  return favourites;    
})



// for managing polygon display
subcatservices.factory('MapOverlays', function() {
// controls polygon overlays on googlemap on homepage
  var overlaysctrl = {
    polyArray: [], // array of polys
    markerArray: [], // array of markers

    // for showing polys
    showPolys: function(map, distance) { // displays polys on map
      if (!this.polyArray.length) { // no polys yet created - create all. 
      this.makePolys();
      };
      // hide polys
      this.hide(this.polyArray); 
      if (distance == 0) {
        for (var i = 0; i < this.polyArray.length; i++) {
          this.polyArray[i].data.setMap(map);
        };

      } else {
        for (var i = 0; i < this.polyArray.length; i++) {
          if (distance == this.polyArray[i].distance) {
            this.polyArray[i].data.setMap(map);
          }     
        };
      }   
    }, 

    manMarkers: function(map, suburbs) { // displays markers on map
      if (!this.markerArray.length) { // no markers yet created - create all. 
        for (var i = 0; i < suburbs.length; i++) {
          var suburb = suburbs[i];
          this.makeMarkers(map, suburb);
        };

        // show all
        for (var k = 0; k < this.markerArray.length; k++) {
          console.log("from the marker array " + this.markerArray[k].id )
          this.markerArray[i].data.setMap(map);
        }

        // show marker of st lucia campus
        var image = "img/university.png";
        var campusLatLng = new google.maps.LatLng(-27.497854,153.013286);
        var campusMarker = new google.maps.Marker({
          position: campusLatLng,
          map: map,
          icon: image
        });
        campusMarker.setMap(map);

      } else { // markers created show and hide as needed

        // hide all markers
        this.hide(this.markerArray);

        // iterate over list of suburbs and compare to list of markers if match then show
        for (var i = 0; i < suburbs.length; i++) {
          var suburb = suburbs[i];
          var id = suburb.id;
            for (var k = 0; k < this.markerArray.length; k++) {
              if (this.markerArray[k].id == id){
                this.markerArray[k].data.setMap(map);
              }
            }
        }
      }
    }, 


    makeMarkers: function(map, suburb) {
      var id = suburb.id;
      var lat = suburb.gmap.marker.lat;
      var lng = suburb.gmap.marker.lng;
      var image = suburb.gmap.marker.icon;
      var uqLatLng = new google.maps.LatLng(lat,lng);
      var uqMarker = new google.maps.Marker({
            position: uqLatLng,
            map: map,
            icon: image
      });
      google.maps.event.addListener(uqMarker, 'click', function() {
              window.location = "#/suburbs/" + suburb.id;
            }); 

      this.markerArray.push({"id": id, "data": uqMarker});
    },




    hide: function(overlayArray) { // hides polys on map
      for (var i = 0; i < overlayArray.length; i++) {
        overlayArray[i].data.setMap(null);
      };
    }, 

    makePolys: function(){
      for (var i = 0; i < polygonpathdata.length; i++) {
        var paths = polygonpathdata[i].data;
        var color = polygonpathdata[i].color;
        var distance = polygonpathdata[i].distance;

        var poly = new google.maps.Polygon({
            paths: paths,
            strokeColor: color,
            strokeOpacity: 0.35,
            strokeWeight: 1,
            fillColor: color,
            fillOpacity: 0.65,
            clickable: false
          });
        this.polyArray.push({"distance": distance, "data": poly});  
      };       
    }
}
return overlaysctrl;    
})





