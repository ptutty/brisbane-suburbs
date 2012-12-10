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


/******* services for cross controller communication of state, data, views , map info  ******/


/* shares a model of current filters on suburbs across suburblist and mainmap controllers */
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



/* for managing favourites */
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



/* for managing polygon and marker overlays */
subcatservices.factory('MapOverlays', function() {
  var overlaysctrl = {
    // marker manager
    markerArray: [], // array of markers
    polyArray: [], // array of polys
    manMarkers: function(map, suburbs, infowindow) { 

      function setListener(data){
        google.maps.event.addListener(data, 'click', function() {
                infowindow.setContent(data.html);
                infowindow.open(map, data);
        });
      };

      function makeMarkers(suburb) {
        var id = suburb.id;
        var name = suburb.name;
        var stlucia = suburb.traveltimes.stlucia + "mins";
        var herston = suburb.traveltimes.herston + "mins";
        var lat = suburb.gmap.marker.lat;
        var lng = suburb.gmap.marker.lng;
        var image = suburb.gmap.marker.icon;
        var uqLatLng = new google.maps.LatLng(lat,lng);
        var uqMarker = new google.maps.Marker({
          position: uqLatLng,
          map: map,
          icon: image,
          html: "<h3><a href='#/suburbs/" + suburb.id + "'>"+ name +"</a></h3><p>Travel time St Lucia: " + stlucia + "</br>Travel time Herston: " + herston + "</p>Read more about living in <a href='#/suburbs/" + suburb.id + "'>" + name + "</a>"
        });
        return {"id": id, "data": uqMarker};
      };


      function hideMarkers(markers) { // hides markers
        for (var i = 0; i < markers.length; i++) {
          markers[i].data.setMap(null);
        };
      };

      // create all markers and add to array. 
      if (!this.markerArray.length) { 
        for (var i = 0; i < suburbs.length; i++) {
          var suburb = suburbs[i];
          this.markerArray.push(makeMarkers(suburb));
        };

        // show all markers in array
        for (var k = 0; k < this.markerArray.length; k++) {
          var data = this.markerArray[k].data;
          setListener(data); // set listeners of infowindows
          data.setMap(map);
        };

      } else { // show and hide markers as suburbs are filtered
        // hide all markers
        hideMarkers(this.markerArray);
        // iterate over list of suburbs and compare to items in marker markerArray
        for (var i = 0; i < suburbs.length; i++) {
          var suburb = suburbs[i];
          var id = suburb.id;
          for (var k = 0; k < this.markerArray.length; k++) {
            if (this.markerArray[k].id == id){
              var data = this.markerArray[k].data;
              setListener(data); // set listeners of infowindows
              data.setMap(map);
            }
          }
        }
      }
    }, 

    // for showing polys
    manPolys: function(map, distance) { // displays polys on map
      
      function makePolys(polys){
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
          polys.push({"distance": distance, "data": poly});  
        };       
      };

      function hidePolys(polys) { // hides polys on map
        for (var i = 0; i < polys.length; i++) {
          polys[i].data.setMap(null);
        };
      }; 

      if (!this.polyArray.length) { // no polys yet created - create all. 
        makePolys(this.polyArray);
      };
      hidePolys(this.polyArray); 
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
      };  
    }
}
return overlaysctrl;    
});





