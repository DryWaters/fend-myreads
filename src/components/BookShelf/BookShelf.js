import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';

const BookShelf = ({
  bookShelf = '', moveBook, title = '', books = [],
}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <ol className="books-grid">
      {books.map(book => (
        <Book key={book.title} details={book} moveBook={moveBook} bookShelf={bookShelf} />
      ))}
    </ol>
  </div>
);

export default BookShelf;

BookShelf.propTypes = {
  title: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.object),
  moveBook: PropTypes.func,
  bookShelf: PropTypes.string,
};

BookShelf.defaultProps = {
  title: '',
  books: [],
  moveBook: () => {},
  bookShelf: '',
};
