import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';

const BookShelf = ({ title, books = [] }) => (
  <div>
    <h1>{title}</h1>
    { books.map(book => (
      <Book key={book.title} details={book} />
    ))}
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
