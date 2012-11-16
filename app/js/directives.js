'use strict';

/* Directives */

// main gmap
App.directive('gmapmain', function($parse) {
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


// suburb gmap
App.directive('gmap', function($parse) {
    return {
        restrict: 'E',
        replace: true,      
        template: '<div></div>',     
        link: function(scope, element, attrs) {       
        attrs.$observe('gdata', function(value) {
			if (value) {
			  var gmapdata = JSON.parse(value);	
				  var myOptions = {
			            zoom: gmapdata.centre.zoom,
			            center: new google.maps.LatLng(gmapdata.centre.lat, gmapdata.centre.lng),
			            mapTypeId: google.maps.MapTypeId.ROADMAP
			        };
			  var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);
			  
			 // setMarkers(map); // adds array of suburb markers
        
			}
		})
        }
    }
})