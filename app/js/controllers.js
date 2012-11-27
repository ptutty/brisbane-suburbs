'use strict';

/* Controllers */

function HeaderCtrl($scope, appServices, $location){
 $scope.suburbdetail = appServices.suburbdetail; 

$scope.add = function(){
  // get the current path and suburb name
  var url = $location.path();
  var name = appServices.suburbdetail.current;
  // create object to add to array 

  // check if object with that name property already exist in the array;
  console.log(name);
  var favlist = appServices.favourites;
  var exists = false;
  for (var i = 0; i < favlist.length; i++) {
      if (name == favlist[i].name) {
       console.log("item already exists");
       exists = true; } 
       else { 
        console.log("not found");
      };
   }; 
    // add to array if not found
   if (!exists){
    var favourite = {"name": name, "url": url};
    appServices.favourites.push(favourite);
   }

  

}


 // button states based on current view
 $scope.state = function() {
    var view = appServices.currentview;
    if (view == "home") {
            return {"mainmap": false ,"showfavourites": true, "addfavourites": false};
      } else if (view == "detailed") {
            return  {"mainmap": true ,"showfavourites": true , "addfavourites": true};
          } else if (view == "favourites") {
            return  {"mainmap": true ,"showfavourites": false , "addfavourites": false};
    }
  } 



};

/* 
both controllers MainMap and SuburbList share a model of the current suburb filtering state so both views are updated.
this model is call 'filter' and is stored in a generic service for sharing data between views called 
appServices 
*/

function SuburbMainMapCtrl($scope, Suburb, appServices){
  $scope.suburbs = Suburb.query();
  $scope.filter = appServices.filter;
  appServices.currentview = "home";
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
    appServices.currentview = "detailed";
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
  // update appService info - for cross controller sharing of state
}

function SuburbFavouritesCtrl($scope, appServices) {
  $scope.favourites = appServices.favourites;
  appServices.currentview = "favourites";
}








//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
