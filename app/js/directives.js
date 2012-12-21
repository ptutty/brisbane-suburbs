'use strict';

/* Directives */
var subcatdirectives = angular.module('suburbcatDirectives', []);


// google map on homepage
subcatdirectives.directive('suburbsmap', function($parse) {

	var suburbMarkerArray = []; 
	var suburbsMap; // google map object

	function mapCreate(id) {
		var myOptions = {
			            zoom: 12,
			            center: new google.maps.LatLng(-27.5222, 153.0031),
			            mapTypeId: google.maps.MapTypeId.ROADMAP
				        };	
		suburbsMap = new google.maps.Map(document.getElementById(id), myOptions); 
	};

	function mapCreateMarker(suburbMarkerData, infoWindowText, id){
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

	function mapCreateInfoWindow(marker){
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
		var stluciaMarker = mapCreateMarker(stluciaCampusMapData, infoWindowText, "stluciacampus");
		mapCreateInfoWindow(stluciaMarker);
	};

	function mapSuburbMarkersInitialize(suburbsData){
        for (var i = 0; i < suburbsData.length; i++) {
          var suburb = suburbsData[i];
          var infoWindowText = "<h3><a href='#/suburbs/" + suburb.id + "'>"+ suburb.name +"</a></h3><p>Travel time St Lucia: " + suburb.traveltimes.stlucia + "</br>Travel time Herston: " + suburb.traveltimes.herston + "</p></a>";
          var suburbMarker = mapCreateMarker(suburb.gmap.marker, infoWindowText, suburb.id);
          mapCreateInfoWindow(suburbMarker);
          suburbMarkerArray.push(suburbMarker);
      	}
	};

	function mapSuburbMarkersUpdate(suburbsData){
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
					mapSuburbMarkersInitialize(data);
				} else if (data.length !== 0 && suburbMarkerArray.length !== 0) {
					mapSuburbMarkersUpdate(data);
				};
			});

			/*
			attrs.$observe('distance', function(distance) { 
				MapOverlays.manPolys(map, distance);
			});*/
		};
	};
});