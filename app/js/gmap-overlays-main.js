
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
            fillOpacity: 0.65
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