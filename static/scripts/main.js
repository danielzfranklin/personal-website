(function(){
    "use strict";
    
    angular.module("danielzfranklin", ["ngSanitize", "ngMaterial", "ngRoute"])
        .config(["$mdThemingProvider", "$routeProvider", "$locationProvider", function($mdThemingProvider, $routeProvider, $locationProvider){
            
        $routeProvider
        .when("/", {
            templateUrl: "static/pages/home/index.html"
        })
        .when("/books", {
            templateUrl: "static/pages/books/books.html"
        })
        .when("/books/:id", {
            templateUrl: "static/pages/books/book.html"
        })
        .when("/contact", {
            templateUrl: "static/pages/contact/contact.html"
        });
            
        $locationProvider.html5Mode(true);
        
        $mdThemingProvider.theme("default")
        .primaryPalette("indigo", {
            default: "500"
        })
        .accentPalette("orange", {
            default: "A700"
        });
    }]);
}());