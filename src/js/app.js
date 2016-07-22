angular.module('ParkingApp', [
  'ngRoute',
  'mobile-angular-ui',
  'ParkingApp.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
});