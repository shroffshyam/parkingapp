angular.module('ParkingApp.controllers.Main', [
	'ParkingApp.services.Search',
  'ParkingApp.services.Gservice'
	])

.controller('MainController', function($scope, gservice){
	
  	$scope.formData = {};
  	var coords = {};
  	var lat = 0;
  	var lng = 0;

  	// Refresh the map with new data
	  gservice.refresh(37.7749, -122.4194); //setting default value to SFO

  	//submit the parkingspot
  	/*$http.post(url, data)
  		.success(function(data){

  		})
  		.error(function(data){
  			console.log('Error' + data);
  		})
  	*/
});