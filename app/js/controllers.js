'use strict';

/* Controllers */

function HeaderCtrl($scope, appServices){
 $scope.currentviews = appServices.currentviews;
 $scope.suburbdetail = appServices.suburbdetail; 
}

function MainMap($scope, Suburb, appServices){
  $scope.suburbs = Suburb.query();
  $scope.query = appServices.query;
  appServices.currentviews.suburbdetail = false;
}

function SuburbListCtrl($scope, Suburb, appServices) {	
  $scope.suburbs = Suburb.query();
  $scope.orderProp = 'name';
  $scope.message = false;
  $scope.query = appServices.query; 

  $scope.resettime = function(){
    appServices.query.time = 0;
  }
  $scope.resetname = function(){
     appServices.query.name = "";
  }
}


function SuburbDetailCtrl($scope, $routeParams, Suburb, appServices) {
  $scope.suburb = Suburb.get({suburbId: $routeParams.suburbId}, function(suburb) {
    $scope.mainImageUrl = suburb.images[0];
    appServices.suburbdetail.current = suburb.name;
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
  // update appService info - for cross controller sharing of state
  appServices.currentviews.suburbdetail = true;
  
}


//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
