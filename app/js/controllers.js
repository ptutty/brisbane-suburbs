'use strict';

/* Controllers */

function SuburbListCtrl($scope, Suburb) {	
  $scope.time = null;	
  $scope.suburbs = Suburb.query();
  $scope.orderProp = 'name';
  $scope.setTime = function(mins) {
  	if (mins != 0) {
  		$scope.time = mins;
  		$scope.message = "Distance from UQ St Lucia " + mins + "mins";
  	} else {
  		$scope.message = "";
  		$scope.time = null;
  	}
  }
}

function OverviewCtrl($scope) {

}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];



function SuburbDetailCtrl($scope, $routeParams, Suburb) {
  $scope.suburb = Suburb.get({suburbId: $routeParams.suburbId}, function(suburb) {
    $scope.mainImageUrl = suburb.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }

  // data for google map directive

}

// simple controller to toggle stuff - see corrresponding directive
function ToggleCtrl($scope){
    $scope.test = true;
    $scope.toggle = function(){ $scope.test = !$scope.test;  };
};


//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
