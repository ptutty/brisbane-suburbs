'use strict';

/* Controllers */

function SuburbListCtrl($scope, Suburb) {	
  $scope.suburbs = Suburb.query();
  $scope.orderProp = 'name';
  $scope.message = false;
  console.log($scope.message);

  $scope.setTime = function(mins) {
    if (mins != 0) {
  		$scope.time = mins;
      $scope.message = true;
      console.log($scope.message);
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

  // data for google map directive

}

// simple controller to toggle stuff - see corrresponding directive  **not in use
function ToggleCtrl($scope){
    $scope.test = true;
    $scope.toggle = function(){ $scope.test = !$scope.test;  };
};


//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
