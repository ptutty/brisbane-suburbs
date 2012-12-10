'use strict';

/* Directives */
var subcatdirectives = angular.module('suburbcatDirectives', []);


// main gmap
subcatdirectives.directive('gmapmain', function($parse, MapOverlays) {

    return {
        restrict: 'E',
        replace: true,      
        template: '<div></div>',     
        link: function(scope, element, attrs) { 
		    var myOptions = {
				            zoom: 12,
				            center: new google.maps.LatLng(-27.522217, 153.003159),
				            mapTypeId: google.maps.MapTypeId.ROADMAP
				        };	
		    var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);  


		     // show marker for st lucia campus
	        var image = "img/university.png";
	        var campusLatLng = new google.maps.LatLng(-27.497854,153.013286);
	        var campusMarker = new google.maps.Marker({
	          position: campusLatLng,
	          map: map,
	          icon: image
	        });
	        // setup default infowindo
	        var infowindow = null;
			var infowindow = new google.maps.InfoWindow({
				content: "holding..."
			});
			google.maps.event.addListener(campusMarker, 'click', function() {
              // window.location = "#/suburbs/" + suburb.id;
              infowindow.setContent("<h3>University of Queensland</h3> <h4>St Lucia campus</h4>");
              infowindow.open(map, campusMarker);
      		}); 
      		campusMarker.setMap(map);


		    attrs.$observe('gdata', function(value) {
				var suburbs = angular.fromJson(value);	
				MapOverlays.manMarkers(map, suburbs, infowindow);
			});

		    attrs.$observe('distance', function(distance) { 
				MapOverlays.manPolys(map, distance);
		    });
        }
    }
})