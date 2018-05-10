import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';

const BookShelf = props => (
  <div>
    <h1>{props.title}</h1>
    { console.log(props.books[0]) }
  </div>
);

export default BookShelf;

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
};
