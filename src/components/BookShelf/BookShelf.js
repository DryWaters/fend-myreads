import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';

const BookShelf = props => (
  <div>
    <h1>{props.title}</h1>
    { props.books.map(book => (
      <Book key={book.title} details={book} />
    ))}
  </div>
);

export default BookShelf;

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array,
};
