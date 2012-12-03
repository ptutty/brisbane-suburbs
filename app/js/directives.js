'use strict';

/* Directives */
var subcatdirectives = angular.module('suburbcatDirectives', []);


// main gmap
subcatdirectives.directive('gmapmain', function($parse) {
    return {
        restrict: 'E',
        replace: true,      
        template: '<div></div>',     
        link: function(scope, element, attrs) {       
        attrs.$observe('gdata', function(value) {
			if (value) {
			  var gmapdata = JSON.parse(value);	
				  var myOptions = {
			            zoom: 12,
			            center: new google.maps.LatLng(-27.522217, 153.003159),
			            mapTypeId: google.maps.MapTypeId.ROADMAP
			        };
			 var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);
             createOverlays(map);  // add overlay for homepage only  
             setMarkers(map, gmapdata); // adds array of suburb markers
			}
		})
        }
    }
})