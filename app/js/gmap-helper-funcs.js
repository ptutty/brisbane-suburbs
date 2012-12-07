

function setMarkers(map, suburbs) {
      function addmarker(suburb, infowindow) {
        if (suburb.gmap) {
            var lat = suburb.gmap.marker.lat;
            var lng = suburb.gmap.marker.lng;
            var image = suburb.gmap.marker.icon;
            var uqLatLng = new google.maps.LatLng(lat,lng);
            var uqMarker = new google.maps.Marker({
                  position: uqLatLng,
                  map: map,
                  icon: image
              });

            google.maps.event.addListener(uqMarker, 'click', function() {
              window.location = "#/suburbs/" + suburb.id;
            });         
        }
      }  

      for (var i = 0; i < suburbs.length; i++) {
        var suburb = suburbs[i];
        addmarker(suburb);
      }

     
      var image = "img/university.png";
      var uqLatLng = new google.maps.LatLng(-27.497854,153.013286);
      var uqMarker = new google.maps.Marker({
            position: uqLatLng,
            map: map,
            icon: image
        });

}

