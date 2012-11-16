'use strict';

/* Directives */


App.directive('gmap', function($parse) {
    return {
        restrict: 'E',
        replace: true,      
        template: '<div></div>',     
        link: function(scope, element, attrs) {       
        attrs.$observe('gdata', function(value) {
			if (value) {
			  var gmapdata = JSON.parse(value);	
			  // var gmapdata = value;
				  var myOptions = {
			            zoom: gmapdata.centre.zoom,
			            center: new google.maps.LatLng(gmapdata.centre.lat, gmapdata.centre.lng),
			            mapTypeId: google.maps.MapTypeId.ROADMAP
			        };
			  var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);
			  
			 setMarkers(map); // adds array of suburb markers
             if (gmapdata.mainmap) {createOverlays(map)}  // add overlay for homepage only   
			}
		})
        }
    };
});