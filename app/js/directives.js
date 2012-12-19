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

	function mapCreateMarker(suburbMarkerData, infoWindowText){
		var latLng = new google.maps.LatLng(suburbMarkerData.lat, suburbMarkerData.lng);
		var marker = new google.maps.Marker({
		  position: latLng,
		  map: suburbsMap,
		  icon: suburbMarkerData.icon,
		  html: infoWindowText
		});
		return marker;
	};

	function mapCreateInfoWindow(marker){
		var infowindow = new google.maps.InfoWindow({
		content: "holding..."
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(marker.html);
			infowindow.open(suburbsMap, marker);
		}); 
		return infowindow; 
	};

	function mapInitialize(id){
		mapCreate(id);
		var stluciaCampusMapData = {"lat": -27.4978, "lng": 153.0132, "icon": "img/university.png"};
		var infoWindowText = "<h3>University of Queensland</h3><p>St Lucia Campus</p>";
		var stluciaMarker = mapCreateMarker(stluciaCampusMapData, infoWindowText);
		mapCreateInfoWindow(stluciaMarker);
	};

	function suburbsMarkersInitialize(suburbsData){
        for (var i = 0; i < suburbsData.length; i++) {
          var suburb = suburbsData[i];
          var suburbMarker = mapCreateMarker(suburb.gmap.marker);
          var infoWindowText = "<h3><a href='#/suburbs/" + suburb.id + "'>"+ suburb.name +"</a></h3><p>Travel time St Lucia: " + stlucia + "</br>Travel time Herston: " + herston + "</p></a>"
          mapCreateInfoWindow(suburbMarker);
      	}
	}


	return {
		restrict: 'E',
		replace: true,      
		template: '<div></div>',     
		link: function(scope, element, attrs) {	
			mapInitialize(attrs.id);
	 		
			attrs.$observe('suburbsdata', function(data) {
				var data = angular.fromJson(data);
				if (data.length !== 0) {
					suburbsMarkersInitialize(data);
				};
					
			
				// MapOverlays.manMarkers(map, suburbs, infowindow);
			});

		/*
		attrs.$observe('distance', function(distance) { 
			MapOverlays.manPolys(map, distance);
		});*/
		}
	}
})