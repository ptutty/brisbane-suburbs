'use strict';

/* Controllers */
function HeaderCtrl($scope, State, Favourites){
 $scope.favourites = Favourites;
 $scope.state = State;
 $scope.add = function(){
    Favourites.updatefavlist(); 
 };


};

/* 
both controllers MainMap and SuburbList share a model of the current suburb filtering state so both views are updated.
this model is call 'filter' and is stored in a generic service for sharing data between views called 
appServices 
*/

function SuburbMainMapCtrl($scope, Suburb, appServices, State){
  $scope.suburbs = Suburb.query();
  $scope.filter = appServices.filter;
  State.currentview = "home";
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


function SuburbDetailCtrl($scope, $routeParams, Suburb, Favourites, State) {
  $scope.suburb = Suburb.get({suburbId: $routeParams.suburbId}, function(suburb) {
    $scope.mainImageUrl = suburb.images[0];
    Favourites.currentsuburb = suburb.name;
  });

  State.currentview = "detailed";

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
  // update appService info - for cross controller sharing of state
}

function SuburbFavouritesCtrl($scope, Favourites, State) {
  $scope.favlist = Favourites.favlist;
  State.currentview = "favourites";
}








//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
