(function(){
    "use strict";
    
    angular.module("danielzfranklin")
    
    .controller("book_controller", ["$routeParams", "google_books", function($routeParams, google_books){
        var _this = this;
        
        _this.book_id = $routeParams.id;
        
        google_books.request("volumes/" + _this.book_id).then(function(response){
            var raw_book = response.data;
            
            _this.data = {
                title: raw_book.volumeInfo.title,
                subtitle: raw_book.volumeInfo.subtitle,
                authors: raw_book.volumeInfo.authors.join(", "),
                image: raw_book.volumeInfo.imageLinks.small,
                pages: raw_book.volumeInfo.pageCount,
                publishedDate: raw_book.volumeInfo.publishedDate,
                publisher: raw_book.volumeInfo.publisher,
                description: raw_book.volumeInfo.description
            };
        });
    }]);
}());
