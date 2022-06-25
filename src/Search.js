import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search, getAll } from "./BooksAPI";
import Book from "./Book";

const Search = ({ updateBook }) => {
  const [input, setInput] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    getAll().then((data) => {
      setAllBooks(data);
    });
  }, []);

  useEffect(() => {
    if (input) {
      search(input).then((data) => {
        if (!data.error) {
          for (let b of data) {
            b.shelf = "none";
            for (let book of allBooks) {
              if (book.id === b.id) {
                b.shelf = book.shelf;
              }
            }
          }

          setSearchResult(data);
        }
      });
    } else {
      setSearchResult([]);
    }
  }, [input]);

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
