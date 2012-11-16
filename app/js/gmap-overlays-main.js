
// adds markers to googlemap for each suburb
function setMarkers(map, markers) {

      for (var i = 0; i < markers.length; i++) {
        var marker = markers[i];

        var image = marker.icon;
        var uqLatLng = new google.maps.LatLng(marker.lat, marker.lng);

        var uqMarker = new google.maps.Marker({
            position: uqLatLng,
            map: map,
            icon: image
        });

      };

        /* google.maps.event.addListener(uqMarker, "click", function() {
           window.location = "http://www.uq.edu.au";
        }); */
      

      // var uqLatLng = new google.maps.LatLng(-27.497854,153.013286);

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