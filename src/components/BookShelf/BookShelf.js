import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';

const BookShelf = ({
  bookShelf, moveBook, title, books,
}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <ol className="books-grid">
      {
        // dynamically create the number of books based passed down from either
        // BookDashboard or SearchDashboard
        books && books.map(book => (
          <Book key={book.id} book={book} moveBook={moveBook} bookShelf={bookShelf} />
        ))
      }
    </ol>
  </div>
);

export default BookShelf;

BookShelf.propTypes = {
  title: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  moveBook: PropTypes.func.isRequired,
  bookShelf: PropTypes.string,
};

BookShelf.defaultProps = {
  title: '',
  bookShelf: 'none',
};
