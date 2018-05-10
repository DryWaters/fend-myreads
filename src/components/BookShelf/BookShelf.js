import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';

const BookShelf = ({ title, books = [] }) => (
  <div>
    <h2>{title}</h2>
    <ol>
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
