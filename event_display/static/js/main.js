var events = angular.module('events', ['ngRoute', 'ngResource']);

events.config(['$routeProvider', function($routeProvider) {
    // Route code will go here
    $routeProvider.
        when('/', {
            templateUrl: 'static/js/views/home.html',
            controller: homeController
        }).
        otherwise({redirectTo: '/'});
}]);

events.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);