(function(){
    angular.module("danielzfranklin")
    .directive("header", function(){
        return {
            restrict: "E",
            replace: true,
            templateUrl: "s/components/header/header.html"
        };
    });
}());