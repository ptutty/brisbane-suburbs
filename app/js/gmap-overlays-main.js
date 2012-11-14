
// adds markers to googlemap for each suburb
function createMarkers(map) {

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
            fillOpacity: 0.55
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


// the polygon data

// array of polygon paths
var redpaths = [[
new google.maps.LatLng(-27.537741,152.973976),
new google.maps.LatLng(-27.540025,152.975006),
new google.maps.LatLng(-27.534545,152.991657),
new google.maps.LatLng(-27.522062,152.991828),
new google.maps.LatLng(-27.515212,152.984447),
new google.maps.LatLng(-27.507142,152.975006),
new google.maps.LatLng(-27.506381,152.971744),
new google.maps.LatLng(-27.509426,152.968826),
new google.maps.LatLng(-27.512623,152.967796),
new google.maps.LatLng(-27.517343,152.968311),
new google.maps.LatLng(-27.526629,152.972774),
new google.maps.LatLng(-27.531957,152.971744),
new google.maps.LatLng(-27.534088,152.971401),
new google.maps.LatLng(-27.537741,152.973976)
],
[
new google.maps.LatLng(-27.504554,152.972602),
new google.maps.LatLng(-27.510796,152.983589),
new google.maps.LatLng(-27.512471,152.986335),
new google.maps.LatLng(-27.500747,152.993545),
new google.maps.LatLng(-27.491459,152.997150),
new google.maps.LatLng(-27.489936,152.994575),
new google.maps.LatLng(-27.486738,152.994575),
new google.maps.LatLng(-27.478210,153.000240),
new google.maps.LatLng(-27.469986,153.009510),
new google.maps.LatLng(-27.466330,153.007621),
new google.maps.LatLng(-27.465721,153.002471),
new google.maps.LatLng(-27.465112,152.996292),
new google.maps.LatLng(-27.474707,152.986164),
new google.maps.LatLng(-27.494504,152.973632),
new google.maps.LatLng(-27.504554,152.972602)
]];

var greenpaths = [[new google.maps.LatLng(-27.511558,152.984619),
new google.maps.LatLng(-27.510796,152.998523),
new google.maps.LatLng(-27.504097,153.005905),
new google.maps.LatLng(-27.492372,153.006248),
new google.maps.LatLng(-27.491611,152.997493),
new google.maps.LatLng(-27.490545,152.995433),
new google.maps.LatLng(-27.488109,152.994232),
new google.maps.LatLng(-27.496941,152.983589),
new google.maps.LatLng(-27.508969,152.981185),
new google.maps.LatLng(-27.511558,152.984619)]]

// array of path data objects
var pathdata = [{"color" : "#FF0000", "data": redpaths}, { "color" : "#CCEDBA", "data": greenpaths}];