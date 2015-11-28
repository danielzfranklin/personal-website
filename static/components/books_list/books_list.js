(function(){
    angular.module("danielzfranklin")
    .directive("booksList", function(){
        return {
            restrict: "E",
            replace: true,
            scope: {
                "list": "=",
                "small": "="
            },
            templateUrl: "s/components/books_list/books_list.html",
            controller: ["$scope", "$http", "google_books", function($scope, $http, google_books){
                var _this = this;
                
                var list = $scope.list;
                _this.books = [];
                
                // number of books to show (if less than # books shows link to more page)
                if($scope.small){
                    _this.show_number = 5;
                }
                else{
                    _this.show_number = list.length; // default show number
                }
                
                list.forEach(function(book, index){                    
                    if(book.indexOf("id:") === 0){// book is a google books id
                        var id = book.substr(3);
                        
                        google_books.request("volumes/" + id).then(function(response){
                            var book = response.data;
                            
                            _this.books[index] = book.volumeInfo;
                            _this.books[index].id = book.id; // volumeInfo doesn't have the id, so add it
                        });
                    }
                    else{// book is a book title, so get the closest matching book
                        google_books.request("volumes", {q: book, maxResults: 1}).then(function(response){
                            var books = response.data;
                            
                            if(books.totalItems === 0){// no results
                                console.warn("Book " + book + " cannot be found. Try providing a google books id instead");
                            }
                            else{
                                _this.books[index] = books.items[0].volumeInfo;
                                _this.books[index].id = books.items[0].id;
                            }
                        });
                    }
                });
                
                console.log(_this.books);
            }],
            controllerAs: "books"
        };
    });
}());