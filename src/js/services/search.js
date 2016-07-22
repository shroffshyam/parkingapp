angular.module('ParkingApp.services.Search', [])

.factory('getNearbySpots', function($http){
	return function(lat, lng, done){
		$http.get('http://ridecellparking.herokuapp.com/api/v1/parkinglocations/search?lat='+lat+'&lng='+lng)
		.success(function(data){
			console.log(data, "inside getnearbyspots");
			done(data);
		})
		.error(function(){
			throw new Error('unable to get parking spots');
		})
	}
});