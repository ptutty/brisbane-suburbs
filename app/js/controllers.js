'use strict';

/* Controllers */
function HeaderCtrl($scope, State, Favourites){
 $scope.favourites = Favourites;
 $scope.state = State;

// $watch is need here as we need to run a function when value of something changes
$scope.$watch('state.currentview', function(currentview) {
        $scope.buttonstate = State.buttonstate();
  });

 $scope.add = function(){
    Favourites.add(); 
 };


};

/* 
both controllers MainMap and SuburbList share a model of the current suburb filtering state so both views are updated.
this model is call 'filter' and is stored in a generic service for sharing data between views called 
appServices 
*/

function SuburbMainMapCtrl($scope, Suburb, Subfilter, State){
  $scope.suburbs = Suburb.query();
  $scope.subfilter = Subfilter;
  State.currentview = "home";
}

function SuburbListCtrl($scope, Suburb, Subfilter) {	
  $scope.suburbs = Suburb.query();
  $scope.orderProp = 'traveltimes.stlucia';
  $scope.subfilter = Subfilter;

  $scope.resettime = function(){
    Subfilter.traveltimes.stlucia = 0;
  }

  $scope.resetname = function(){
     Subfilter.name = "";
  }
}


function SuburbDetailCtrl($scope, $routeParams, Suburb, Favourites, State) {
    
  // initialise map before template is hidden
    var map;
    var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(-27.50,153.00),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  
  // hide template until data loaded 
  $scope.httpStatus = false; // in progress, stops the showing of empty template before AJAX data loading
  // load ajax data
  $scope.suburb = Suburb.get({suburbId: $routeParams.suburbId}, function(suburb) {
    $scope.mainImageUrl = suburb.images[0];
    Favourites.currentsuburb = suburb.name;
    // show template
    $scope.httpStatus = true; // ready
    // update map centre with suburb data
    setmap(suburb.gmap.centre);
  }); 
   // update appService info - for cross controller sharing of state
  State.currentview = "detailed";

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }


  function setmap(centre){ 
    var lat = centre.lat; 
    var lng = centre.lng; 
    var myLatLng = new google.maps.LatLng(lat, lng); 
    map.setCenter(myLatLng); 
  }

};



function SuburbFavouritesCtrl($scope, Favourites, State) {
  $scope.subfav = Favourites;
  
  // To make sure the view is updated when service variables are change it is important
  // that you create scope for service object at the top level i.e. $scope.subfav = Favourites
  // and then reference sub properties in the view {{ subfav.list}} rather than doing: $scope.list = Favourites.list
  // in the controller which will take a static reference. 
  // in some instances you could use $watch but it should not be necessary.
  
  $scope.remove =  function() {
    Favourites.remove();
  };
  State.currentview = "favourites";
  Favourites.localstorage.read();
}








//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
