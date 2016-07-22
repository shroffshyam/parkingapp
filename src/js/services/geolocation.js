angular.module('ParkingApp.services.Geolocation', [
  'ParkingApp.services.Cordova'
])
.factory('getCurrentPosition', function(deviceReady, $document, $window, $rootScope){
	return function(done){
		deviceReady(function(){
			navigator.geolocation.getCurrentPosition(function(position){
				$rootScope.$apply(function(){
					done(position);
				});
			}, function(error){
				$rootScope.$apply(function(){
					throw new Error('Unable to retrieve position');
				})
			})
		})
	}
});