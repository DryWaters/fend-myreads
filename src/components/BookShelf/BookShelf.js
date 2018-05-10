import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';

const BookShelf = ({ moveBook, title, books = [] }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <ol className="books-grid">
      {books.map(book => (
        <Book key={book.title} details={book} moveBook={moveBook} />
      ))}
    </ol>
  </div>
);

export default BookShelf;

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired,
};
