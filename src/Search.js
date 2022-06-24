import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search } from "./BooksAPI";
import Book from "./Book";

const Search = ({ updateBook, allBooks }) => {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (input) {
      search(input).then((res) => {
        if (!res.error && input.trim() !== "") {
          let x = res.map((book) => {
            allBooks.map((b) => {
              if (b.id === book.id) {
                book.shelf = b.shelf;
              }
              return b;
            });

            return book;
          });

          setSearchResult([...x]);
        } else {
          setSearchResult([]);
        }
      });
    } else {
      setSearchResult([]);
    }
  }, [input, allBooks]);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={inputHandler}
            value={input}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResult.map((book) => (
            <li key={book.id}>
              <Book book={book} updateBook={updateBook}></Book>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
