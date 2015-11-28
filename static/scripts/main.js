(function(){
    "use strict";
    
    angular.module("danielzfranklin", ["ngSanitize", "ngMaterial", "ngRoute"])
        .config(["$mdThemingProvider", "$routeProvider", "$locationProvider", function($mdThemingProvider, $routeProvider, $locationProvider){
            
        $routeProvider
        .when("/", {
            templateUrl: "s/pages/home/index.html"
        })
        .when("/books", {
            templateUrl: "s/pages/books/books.html"
        })
        .when("/books/:id", {
            templateUrl: "s/pages/books/book.html"
        })
        .when("/contact", {
            templateUrl: "s/pages/contact/contact.html"
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