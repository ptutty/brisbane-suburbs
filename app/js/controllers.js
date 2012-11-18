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

  if (querySuburb.query.time != 0) {
      $scope.message = true;
    } else {
      $scope.message = false;
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
