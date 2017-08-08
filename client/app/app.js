var app = angular.module('AppSortNumbers', ['ngRoute', 'ngSanitize', 'ngMaterial']);


app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/sorter', {
            templateUrl: '../app/views/sorter.html'
        })
        .when('/form', {
            templateUrl: '../app/views/form.html'
        })
        .otherwise({
            redirectTo: '/sorter'
        })
});

app.run(['$rootScope', '$location', '$routeParams', function ($rootScope, $location, $routeParams) {
}]);