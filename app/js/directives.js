'use strict';

/* Directives */
var subcatdirectives = angular.module('suburbcatDirectives', []);


// main gmap
subcatdirectives.directive('gmapmain', function($parse, MapPolygons) {

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
				// setMarkers(map, gmapdata); // adds array of suburb markers
			}
		});

	    attrs.$observe('overlay', function(overlay) { 
			console.log("overlay is " + overlay);
			if (overlay === "1") { 
				MapPolygons.showPolys(map); 
			}
			else {  
				console.log("remove overlay");
				MapPolygons.hidePolys();
			}
	    });

        	
        }
    }
})