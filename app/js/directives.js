'use strict';

/* Directives */
var subcatdirectives = angular.module('suburbcatDirectives', []);


// google map on homepage
subcatdirectives.directive('suburbsmap', function() {
	var suburbMarkerArray = []; 
	var suburbPolygonArray = [];
	var suburbsMap; // google map object
	function mapCreate(id) {
		var myOptions = {
			            zoom: 12,
			            center: new google.maps.LatLng(-27.5222, 153.0031),
			            mapTypeId: google.maps.MapTypeId.ROADMAP
				        };	
		suburbsMap = new google.maps.Map(document.getElementById(id), myOptions); 
	};
	function mapMarkerCreate(suburbMarkerData, infoWindowText, id){
		var latLng = new google.maps.LatLng(suburbMarkerData.lat, suburbMarkerData.lng);
		var marker = new google.maps.Marker({
		  position: latLng,
		  map: suburbsMap,
		  icon: suburbMarkerData.icon,
		  html: infoWindowText,
		  id: id
		});
		return marker;
	};
	function mapInfoWindowCreate(marker){
		var infowindow = new google.maps.InfoWindow({
		content: "holding..."
		});
		google.maps.event.addListener(marker, 'mouseover', function() {
          infowindow.setContent(marker.html);
          infowindow.open(suburbsMap, marker);
        });
        google.maps.event.addListener(marker, 'mouseout', function() {
          infowindow.close();
        });
        google.maps.event.addListener(marker, 'click', function() {
          window.location = "#/suburbs/" + marker.id;
        });
		return infowindow; 
	};
	function mapInitialize(id){
		mapCreate(id);
		var stluciaCampusMapData = {"lat": -27.4978, "lng": 153.0132, "icon": "img/university.png"};
		var infoWindowText = "<h3>University of Queensland</h3><p>St Lucia Campus</p>";
		var stluciaMarker = mapMarkerCreate(stluciaCampusMapData, infoWindowText, "stluciacampus");
		mapInfoWindowCreate(stluciaMarker);
	};
	function mapMarkersInitialize(suburbsData){
        for (var i = 0; i < suburbsData.length; i++) {
          var suburb = suburbsData[i];
          var infoWindowText = "<h3><a href='#/suburbs/" + suburb.id + "'>"+ suburb.name +"</a></h3><p>Travel time St Lucia: " + suburb.traveltimes.stlucia + "</br>Travel time Herston: " + suburb.traveltimes.herston + "</p></a>";
          var suburbMarker = mapMarkerCreate(suburb.gmap.marker, infoWindowText, suburb.id);
          mapInfoWindowCreate(suburbMarker);
          suburbMarkerArray.push(suburbMarker);
      	}
	};
	function mapPolygonInitialize(distance, callback){
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
          if (typeof callback === 'function'){
		    callback(poly, true);
          };
          suburbPolygonArray.push({"distance": distance, "data": poly});  
        };  
	};
	function mapPolygonShowHide(polygon, show){
		if (show == true){
			polygon.setMap(suburbsMap);
		} else {
			polygon.setMap(null);	
		}
	};
	function mapPolygonUpdate(currentdistance) { // hides polys on map
        for (var i = 0; i < suburbPolygonArray.length; i++) {
        	var poly = suburbPolygonArray[i].data;
        	var polydistance = suburbPolygonArray[i].distance;
        	mapPolygonShowHide(suburbPolygonArray[i].data, false);
        	if (polydistance == currentdistance){
        		mapPolygonShowHide(poly, true);
        	};	
        	if (currentdistance == 0){
        		mapPolygonShowHide(poly, true);
        	};
        };
     }; 
	function mapMarkersUpdate(suburbsData){
		 mapMarkerHide(); // hide all markers
		 // iterate over new suburbs list to display
		 // compare id with marker id markerArray display marker if true
	     for (var i = 0; i < suburbsData.length; i++) {
	     	var suburbID = suburbsData[i].id;
	     	for (var k = 0; k < suburbMarkerArray.length; k++) {
	     		var marker = suburbMarkerArray[k];
		     	if (suburbID == marker.id){
		     		marker.setMap(suburbsMap);
		     	};
	     	};
	     };
	};
	function mapMarkerHide() { // hides markers
		for (var i = 0; i < suburbMarkerArray.length; i++) {
         	var marker = suburbMarkerArray[i];
         	marker.setMap(null);
         };    
    };
	return {
		restrict: 'E',
		replace: true,      
		template: '<div></div>',     
		link: function(scope, element, attrs) {	
			mapInitialize(attrs.id);
			attrs.$observe('suburbsdata', function(data) {
				var data = angular.fromJson(data);
				if (data.length !== 0 && suburbMarkerArray.length == 0) {
					mapMarkersInitialize(data);
				} else if (data.length !== 0 && suburbMarkerArray.length !== 0) {
					mapMarkersUpdate(data);
				};
			});		
			attrs.$observe('distance', function(distance) { 
				if (suburbPolygonArray.length == 0) {
					mapPolygonInitialize(distance, mapPolygonShowHide); 
				} else if (suburbMarkerArray.length !== 0) {
					mapPolygonUpdate(distance);
				};
			});
		}
	};
});