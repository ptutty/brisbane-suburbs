'use strict';

/* Controllers */



function MainMap($scope, Suburb, querySuburb){
 $scope.suburbs = Suburb.query();
 $scope.query = querySuburb.query;
}

function SuburbListCtrl($scope, Suburb, querySuburb) {	
  $scope.suburbs = Suburb.query();
  $scope.orderProp = 'name';
  $scope.message = false;
  $scope.query = querySuburb.query; 

  $scope.setTime = function(mins) {
  querySuburb.query.name = "";
   
    if (mins != 0) {
      querySuburb.query.time = mins;
      $scope.message = true;
    } else {
      $scope.message = false;
      querySuburb.query.time = mins;

      // jquery dom maniuplation in contoller - not the angular way!! but...
      $("#timetravel label").find("input:radio:checked").prop('checked',false);
  	}
  }
}


function SuburbDetailCtrl($scope, $routeParams, Suburb) {
  $scope.suburb = Suburb.get({suburbId: $routeParams.suburbId}, function(suburb) {
    $scope.mainImageUrl = suburb.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}


//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
