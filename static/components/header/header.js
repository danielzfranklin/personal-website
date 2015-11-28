(function(){
    angular.module("danielzfranklin")
    .directive("header", function(){
        return {
            restrict: "E",
            replace: true,
            templateUrl: "static/components/header/header.html"
        };
    });
}());