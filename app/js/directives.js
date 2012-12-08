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

		    attrs.$observe('gdata', function(value) {
				if (value) {
					var gmapdata = JSON.parse(value);	
					MapOverlays.manMarkers(map, gmapdata);
				}
			});

		    attrs.$observe('distance', function(distance) { 
				MapOverlays.showPolys(map, distance);
		    });
        }
    }
})