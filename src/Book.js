import React from "react";

const Book = ({ updateBook, book }) => {
  const options = ["none", "wantToRead", "read", "currentlyReading"];
  let thumbnail = book.imageLinks ? book.imageLinks.thumbnail : "";

  const selectHandler = (e) => {
    updateBook(book, e.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${thumbnail}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select onChange={selectHandler} defaultValue={book.shelf}>
            <option value="none" disabled>
              Move to...
            </option>
            {options.map((op) => (
              <option key={Math.random()} value={op}>
                {op}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
};

export default Book;
