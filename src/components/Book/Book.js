import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ bookShelf, moveBook, details = {} }) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={
            {
              width: 128,
              height: 193,
              backgroundImage: `url("${details.imageLinks.smallThumbnail || '../../styles/icons/no-thumbnail.png'}")`,
            }
          }
        />
        <div className="book-shelf-changer">
          <select value={bookShelf} onChange={event => moveBook(details.id, event.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>
      <div className="book-title">{details.title}</div>
      {details.authors && details.authors.map(author => <div key={author} className="book-authors">{author}</div>)}
    </div>
  </li>
);

export default Book;

Book.propTypes = {
  details: PropTypes.shape({
    allowAnonLoggin: PropTypes.bool,
    authors: PropTypes.arrayOf(PropTypes.string),
    averageRating: PropTypes.number,
    canonicalVolumeLink: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    contentDescription: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    imageLinks: PropTypes.shape({
      smallThumbnail: PropTypes.string,
      thumbnail: PropTypes.string,
    }),
    industryIdentifiers: PropTypes.arrayOf(PropTypes.object),
    infoLink: PropTypes.string,
    language: PropTypes.string,
    maturityRating: PropTypes.string,
    pageCount: PropTypes.number,
    panelizationSummary: PropTypes.shape({
      containsEpubBubbles: PropTypes.bool,
      containsImageBubbles: PropTypes.bool,
    }),
    previewLink: PropTypes.string,
    printType: PropTypes.string,
    publishedDate: PropTypes.string,
    publisher: PropTypes.string,
    ratingsCount: PropTypes.number,
    readingMods: PropTypes.shape({
      image: PropTypes.bool,
      text: PropTypes.bool,
    }),
    shelf: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  moveBook: PropTypes.func.isRequired,
  bookShelf: PropTypes.string.isRequired,
};
