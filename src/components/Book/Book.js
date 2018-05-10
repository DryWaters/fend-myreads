import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ moveBook, details = {} }) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${details.imageLinks.smallThumbnail}")` }} />
        <div className="book-shelf-changer">
          <select onChange={event => moveBook(details.id, event.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{details.title}</div>
      {details.authors.map(author => <div key={author} className="book-authors">{author}</div>)}
    </div>
  </li>
);

export default Book;

Book.propTypes = {
  details: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired,
};
