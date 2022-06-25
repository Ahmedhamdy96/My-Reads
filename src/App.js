import { useState, useEffect } from "react";
import { getAll, update } from "./BooksAPI";
import "./App.css";
import Search from "./Search";
import ListBooks from "./ListBooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    getAll().then((res) => setAllBooks(res));
  }, []);

  const updateBook = (book, shelf) => {
    update(book, shelf).then((res) => {
      book.shelf = shelf;
      let books = allBooks.filter((b) => {
        return b.id !== book.id;
      });

      setAllBooks([...books, book]);
    });
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/"
            exact
            element={<ListBooks allBooks={allBooks} updateBook={updateBook} />}
          />
          <Route
            path="/search"
            element={<Search allBooks={allBooks} updateBook={updateBook} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
