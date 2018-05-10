import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';

const BookShelf = ({ title, books = [] }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <ol className="books-grid">
      {books.map(book => (
        <Book key={book.title} details={book} />
      ))}
    </ol>
  </div>
);

export default BookShelf;

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object),
};

BookShelf.defaultProps = {
  books: [],
};
