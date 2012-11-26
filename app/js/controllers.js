'use strict';

/* Controllers */

function HeaderCtrl($scope, appServices){
 $scope.currentviews = appServices.currentviews;
 $scope.suburbdetail = appServices.suburbdetail; 
}

// both controller MainMap and SuburbList share a model of the current suburb filtering state so both views are updated.
// this model is call 'filter' and is stored in a generic service for sharing data between views called 
// appServices

function MainMap($scope, Suburb, appServices){
  $scope.suburbs = Suburb.query();
  $scope.filter = appServices.filter;
  appServices.currentviews.suburbdetail = false;
}

function SuburbListCtrl($scope, Suburb, appServices) {	
  $scope.suburbs = Suburb.query();
  $scope.orderProp = 'name';
  $scope.filter = appServices.filter;

  $scope.resettime = function(){
    appServices.filter.traveltimes.stlucia = 0;
  }

  $scope.resetname = function(){
     appServices.filter.name = "";
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
