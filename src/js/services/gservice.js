angular.module('ParkingApp.services.Gservice', [
	'ParkingApp.services.Search', 
	'InfoBoxService'
])
.factory('gservice', function(getNearbySpots, $document, $window){
	//services our fatory will return
	var googleMapServices = {};
	var locations = [];

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
								'<div class="flex-container"><div class="flex-item"> Open Spots<br/> 2</div><div class="flex-item"> Cost<br/> $'+ spot.cost_per_minute +'</div><div class="flex-item"> Distance<br/>1 miles</div></div>'+
								'<button class="btn btn-primary center-block">Pay and Reserve</button>'+
								'</div>';
			//convert each record into googls maps format
			locations.push({
				latlon: new google.maps.LatLng(spot.lat, spot.lng),
                message: new google.maps.InfoWindow({
                        content: contentString,
                        width:300,
                        backgroundColor: '#007aff' 
                    })    
			});
		}

		return locations;
	};

	var initialize = function(lat, lng){
		if(!map){
			// Create a new map and place in the index.html page
	        var map = new google.maps.Map(document.getElementById('map'), {
	            zoom: 16,
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
    			  strokeColor: '#0000ff'
			    },
			})
			//add listener for marker
			google.maps.event.addListener(marker, 'click', function(e){
				currentSelectedMarker = n;
	            n.message.open(map, marker);
	        });

			//add event for inside info window click
	         /*google.maps.event.addDomListener(n.message_,'click',function(e) {
	            return function() {
	              alert('clicked ' + cityList[i][0])
	            }
	          });*/
		});

	};

	return googleMapServices;
});