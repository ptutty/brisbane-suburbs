'use strict';

/* Controllers */

function MainMap($scope){
 $scope.gmapdata = {"centre": {"lat": -27.522217, "lng": 153.003159, "zoom": 12}, "mainmap": true}

 /*
 $scope.gmapdata.markers = [{
                "lat": -27.508097, 
                 "lng" : 153.05125,
                 "icon" : "img/suburb.png"
             }];

  */

};

function SuburbListCtrl($scope, Suburb) {	
  $scope.suburbs = Suburb.query();
  $scope.orderProp = 'name';
  $scope.message = false;

  $scope.setTime = function(mins) {
    if (mins != 0) {
  		$scope.time = mins;
      $scope.message = true;
    } else {
      $scope.message = false;
      $scope.time = null;
  	}
  }
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];


function SuburbDetailCtrl($scope, $routeParams, Suburb) {
  $scope.suburb = Suburb.get({suburbId: $routeParams.suburbId}, function(suburb) {
    $scope.mainImageUrl = suburb.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}

// simple controller to toggle stuff - see corrresponding directive  **not in use
/* function ToggleCtrl($scope){
    $scope.test = true;
    $scope.toggle = function(){ $scope.test = !$scope.test;  };
}; */


//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
