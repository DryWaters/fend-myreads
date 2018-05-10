import React from 'react';
import Book from '../Book/Book';

const BookShelf = props => (
  <div>
    <Book details={props} />
    <Book />
  </div>
);

export default BookShelf;
