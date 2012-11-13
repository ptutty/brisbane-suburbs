'use strict';

/* Directives */

// simple directive to get start - toogle visibilty of element 
/*
App.directive('ngShow2', function() {
    return {
        replace: true,
        restrict: 'A',
        link: function(scope, element, attr){
            scope.$watch(attr.ngShow2, function(value){
               element.css('display', value ? '' : 'none');
            });
        }
    };
});
*/


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
				            zoom: 15,
				            center: new google.maps.LatLng(markers.lat, markers.lng),
				            mapTypeId: google.maps.MapTypeId.ROADMAP
				        };
				  var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);      
				}
			})
     
        }
    };
});