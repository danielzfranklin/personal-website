(function(){
    "use strict";
    
    angular.module("danielzfranklin")
    
    .service("google_books", ["$http", function($http){
        var _this = this;
        
        _this.request = function(url_portion, parameters){
            var api_key = "AIzaSyAVLCnRtTZgWN80tYJQ8aC9VHxtXjj0M2g";
            var api_endpoint = "https://www.googleapis.com/books/v1/";

            if(!parameters){
                parameters = {};
            }
            
            parameters.key = api_key;

            return $http.get(api_endpoint + url_portion, {params: parameters});
        };
        
    }]);
}());