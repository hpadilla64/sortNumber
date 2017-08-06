var app = angular.module('AppSortNumbers', ['ngRoute', 'ngSanitize', 'ngMaterial']);


app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/sorter', {
            templateUrl: '../app/views/sorter.html'
        })
        .otherwise({
            redirectTo: '/sorter'
        })
});

app.run(['$rootScope', '$location', '$routeParams', function ($rootScope, $location, $routeParams) {
   
}]);