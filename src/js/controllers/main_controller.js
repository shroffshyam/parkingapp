angular.module('ParkingApp.controllers.Main', [
	'ParkingApp.services.Geolocation',
	'ParkingApp.services.Search',
    'ParkingApp.services.Gservice'
	])

.controller('MainController', function($scope, getCurrentPosition, getNearbySpots, gservice){
	/*getCurrentPosition(function(position){
		console.log(position);
	    getNearbySpots(
	      position.coords.latitude, 
	      position.coords.longitude, 
	      function(location, weather){
	        $scope.location = location;
	        $scope.weather = weather;
	      });
  	});*/

  	$scope.formData = {};
  	var coords = {};
  	var lat = 0;
  	var lng = 0;

  	// Refresh the map with new data
	  gservice.refresh(37.7749, -122.4194);

  	//set initial coordinates 37.7749° N, 122.4194° W

  	//submit the parkingspot
  	/*$http.post(url, data)
  		.success(function(data){

  		})
  		.error(function(data){
  			console.log('Error' + data);
  		})
  	*/
});