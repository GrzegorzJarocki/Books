$(function () { //document.

    function loadBooks() {
        $.ajax({
            url: "http://localhost:8282/books/",
            type: "GET",
            dataType: "json"
        }).done(function(books) {
            //Dodajemy ksiązki
            console.log(books)
            $(books).each(function (index, element) {
                addBookTitle(element.title, element.id);
            });

            $("#book-list li").on("click", function (e) {
                showDescription( $(this).attr("id") );
            });
        })
    }

    function  addBookTitle(title, id) {
        var bookList = $("#book-list");
        var li = $("<li class='list-group-item'>");
        var div = $("<div class='book-description'>");
        var deleteLink = $("<a href='#' class='delete-link btn btn-danger'>delete</a>");
        var editLink = $("<a href='#' class='success-link btn btn-success'>Edit</a>");

        li.attr("id", id).text(title).appendTo(bookList);
        div.appendTo(li);
        deleteLink.attr("data-book", id).appendTo(li);
        editLink.attr("data-book", id).appendTo(li);


        $("a.delete-link").on("click", function (e) {
            //event wywoluje metode usuwajaca ksiazke o danym id
            deleteBook( $(this).attr("data-book") );
        })

        $("a.success-link").on("click", function (e) {
            //event wywoluje metode usuwajaca ksiazke o danym id
            editBook( $(this).attr("data-book") );
        })

    }

    function deleteBook(id) {
        $("#book-list").empty();
        $.ajax({
            type: 'DELETE',
            url: ("http://localhost:8282/books/" + id)
        }).done(function (data) {
            // alert('Book deleted');
            loadBooks();
        })
    }

    function editBook(id) {
        // $("#book-list").empty();
       //TODO
    }

    function showDescription(id) {
        var thisBooksDiv = $("#book-list li#" + id).find(".book-description")

        if (thisBooksDiv.text().length === 0) {
            $.get({
                url: ("http://localhost:8282/books/" + id)
            }).done(function (data) {
                thisBooksDiv.html("ID: " + data.id + "<br>ISBN: " + data.isbn + "<br> TITLE: " + data.title
                    + "<br>AUTHOR: " + data.author + "<br>PUBLISHER: " + data.publisher + "<br>TYPE: " + data.type);
            });
        } else {
            thisBooksDiv.toggle();
        }
    }

    function addBook() {



        var btn = $("#add_btn");

        btn.on("click", function (e) {
            e.preventDefault();
            var book = {
                isbn : $("#isbn").val(),
                title : $("#title").val(),
                author : $("#author").val()
            };

            var bookToSend = JSON.stringify(book);

            $.post({
                url: "http://localhost:8282/books/",
                data: bookToSend,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).done(function (data) {
                console.log(data)
                //po dodaniu ksiazki odswiezam liste wyswietlana na stronie
                $("#book-list").empty();
                loadBooks();
            });
        });
    }




    loadBooks();
    addBook();

})