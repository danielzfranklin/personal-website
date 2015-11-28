(function(){
    "use strict";
    
    angular.module("danielzfranklin")
    .directive("contact", function(){
        return {
            restrict: "E",
            replace: true,
            templateUrl: "static/components/contact/contact.html",
            controller: ["$http", "$scope", function($http, $scope){
                var _this = this;
                
                _this.send_succeed = false;
                _this.send_fail = false;
                _this.attempt = "notyet"; // can be 'notyet' || 'done' || 'loading'
                
                _this.data = {
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                    // non form field data
                    useragent: navigator.userAgent
                };
                
                _this.contact = function(){
                    if($scope.contactForm.$valid){
                        _this.attempt = "loading";

                        $http.post("/api/contact", _this.data).then(function(){
                            _this.send_succeed = true;
                            _this.attempt = "done";
                        },function(){
                            _this.send_fail = true;
                            _this.attempt = "done";
                        });
                    }
                };
            }],
            controllerAs: "contact"
        };
    });
}());
