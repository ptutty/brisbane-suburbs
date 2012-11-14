'use strict';

/* Directives */


App.directive('gmap', function($parse) {
    return {
        restrict: 'E',
        replace: true,      
        template: '<div></div>',     
        link: function(scope, element, attrs) {       
        attrs.$observe('markers', function(value) {
			if (value) {
			  var markers = JSON.parse(value);
				  var myOptions = {
			            zoom: markers.zoom,
			            center: new google.maps.LatLng(markers.lat, markers.lng),
			            mapTypeId: google.maps.MapTypeId.ROADMAP
			        };
			  var map = new google.maps.Map(document.getElementById(attrs.id), myOptions); 
              if (markers.main) {createOverlays(map);}     
			}
		})
        }
    };
});