angular.module('ParkingApp.services.Gservice', ['ParkingApp.services.Search'])
.factory('gservice', function($http, getNearbySpots, $document, $window){
	//services our fatory will return
	var googleMapServices = {};

	var locations = [];
	var selectedLat = 39.5;
	var selectedLong = -98.35;

	//function which refreshs the map with new data
	googleMapServices.refresh = function(lat, lng){
		//clear the locations
		locations = [];
		selectedLat = lat;
		selectedLong = lng;

		//fetch results for selcted records
		getNearbySpots(lat, lng, function(response){
			//convert the results into google map format
			locations = convertToMapPoints(response);

			//initialize the map
			initialize(lat, lng);
		})
	};

	var convertToMapPoints = function(results){
		var locations = [];
		
		for(var i=0; i < results.length; i++){
			var spot = results[i];
			//create popup window for each record
			var contentString = '<div class="infoWindowContent">'+
								'<p><b>'+spot.name+'</b></p>'+
								'<hr>'+
								'<div class="row"><div class="col-md-4"> Cost</div><div class="col-md-4"> Open Spot</div><div class="col-md-4"> distance</div></div>'+
								'<button class="btn btn-primary block-center">Pay and Reserve</button>'+
								'</div>';
			//convert each record into googls maps format
			locations.push({
				latlon: new google.maps.LatLng(spot.lat, spot.lng),
                message: new google.maps.InfoWindow({
                        content: contentString,
                         backgroundColor: '#007aff' 
                    }),
                    name: spot.name    
			});
		}

		return locations;
	};

	var initialize = function(lat, lng){
		var myLatLng = {lat:lat, lng:lng};
		//not created
		if(!map){
			// Create a new map and place in the index.html page
	        var map = new google.maps.Map(document.getElementById('map'), {
	            zoom: 18 ,
	            center: new google.maps.LatLng(lat, lng),
	            mapTypeId: google.maps.MapTypeId.ROADMAP
	        });
		}

		//loop all the locaiton n place the marker
		locations.forEach(function(n,i){
			var marker = new google.maps.Marker({
				position:n.latlon,
				map:map,
				title:"Parking Map",
				//icon:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"	
				icon: {
			      path: google.maps.SymbolPath.CIRCLE,
			      scale: 5,
			      fillColor: '#0080ff',
    			  fillOpacity: 0.8,
    			  strokeColor: '#0000ff',
			    },
			})

			//add listener for marker
			google.maps.event.addListener(marker, 'click', function(e){

	            // When clicked, open the selected marker's message
	            currentSelectedMarker = n;
	            n.message.open(map, marker);
	        });
		});

	};

	// Refresh the page upon window load. Use the initial latitude and longitude
	google.maps.event.addDomListener(window, 'load', googleMapServices.refresh(selectedLat, selectedLong));

	return googleMapServices;
});