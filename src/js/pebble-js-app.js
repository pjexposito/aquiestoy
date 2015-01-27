var locationOptions = {"timeout": 15000, "maximumAge": 60000}; 
function fetch_location_data(pos) {
  var req = new XMLHttpRequest(),
      latitude = pos.coords.latitude,
      longitude = pos.coords.longitude;

  
  req.open('GET', 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true_or_false', true);


  req.onload = function(e) {
  	if (req.readyState == 4 && req.status == 200) {
          if (req.status == 200) {
             var response = JSON.parse(req.responseText);
             if (response && response.status == 'OK') {
               
                var calle = response.results[0].address_components[1].long_name;
                var numero = response.results[0].address_components[0].long_name;
                Pebble.sendAppMessage({"location": calle + ', ' + numero});
             }
           } else {
      	   console.log("Error");
         }
    }
  }
  req.send(null);
}


function fetch_location_error(err) {
  console.log(err);
  Pebble.sendAppMessage({"location": "No es posible conseguir los datos"});
}

Pebble.addEventListener("ready", function(e) {
  locationWatcher = window.navigator.geolocation.watchPosition(fetch_location_data, fetch_location_error, locationOptions);
});