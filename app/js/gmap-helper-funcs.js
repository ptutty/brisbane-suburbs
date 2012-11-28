

function setMarkers(map, suburbs) {

      function addmarker(suburb, infowindow) {
        if (suburb.gmap) {
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
        }
      }  

      for (var i = 0; i < suburbs.length; i++) {
        var suburb = suburbs[i];
        addmarker(suburb);
      }

     
      var image = "img/university.png";
      var uqLatLng = new google.maps.LatLng(-27.497854,153.013286);
      var uqMarker = new google.maps.Marker({
            position: uqLatLng,
            map: map,
            icon: image
        });

}


// adds polygons to googlemap on homepage for each distance zone
function createOverlays(map) {
  // add polys to map
  function addPoly(paths , color){
    var poly = new google.maps.Polygon({
            paths: paths,
            strokeColor: color,
            strokeOpacity: 0.35,
            strokeWeight: 1,
            fillColor: color,
            fillOpacity: 0.65,
            clickable: false
          });
          poly.setMap(map);
  }
    // iterates over data below and creates colored polygons
    for (k in pathdata){ 
        for (i in pathdata[k].data) {
          var paths = pathdata[k].data[i];
          addPoly(paths, pathdata[k].color); 
        };
    }      
} 

// array of path data objects
var pathdata = [
{"color" : "#2277ff", "data": bluepaths},
{"color" : "#116633", "data": greenpaths}, 
{"color" : "#7700bb", "data": purplepaths},
{"color" : "#dd0000", "data": redpaths},
{"color" : "#eeff55", "data": yellowpaths},

 ]