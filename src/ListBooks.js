import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Shelf from "./Shelf";

const ListBooks = ({ allBooks, updateBook }) => {
  let wantToRead = allBooks.filter((book) => book.shelf === "wantToRead");
  let currentlyReading = allBooks.filter(
    (book) => book.shelf === "currentlyReading"
  );
  let read = allBooks.filter((book) => book.shelf === "read");

  return (
    <div className="list-books">
      <Header />
      <div className="list-books-content">
        <div>
          <Shelf
            key={Math.random()}
            updateBook={updateBook}
            shelfTitle="Currently Reading"
            books={currentlyReading}
          />
          <Shelf
            key={Math.random()}
            updateBook={updateBook}
            shelfTitle="Want to Read"
            books={wantToRead}
          />
          <Shelf
            key={Math.random()}
            updateBook={updateBook}
            shelfTitle="Read"
            books={read}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
