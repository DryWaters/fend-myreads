import React from 'react';
import PropTypes from 'prop-types';
import noThumbnail from '../../styles/icons/no-thumbnail.png';

// Book is a stateless component that receives the props that includes the
// shelf the book should be on, a function to change the shelf, and the book
// details that are passed down from the "BookShelf" component
const Book = ({ bookShelf, moveBook, book }) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div

          className="book-cover"
          // react in-line style that shows either the image if available or the no thumbnail
          // filler image if not available
          style={
            {
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks === undefined ? noThumbnail : book.imageLinks.smallThumbnail})`,
            }
          }
        />
        <div className="book-shelf-changer">
          <select className="book-shelf-changer select" value={bookShelf} onChange={event => moveBook(book, event.target.value)}>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {
        // dynamically create authors <div>s as long as the book.authors key is defined
        book.authors && book.authors.map(author => <div key={author} className="book-authors">{author}</div>)
      }
    </div>
  </li>
);

export default Book;

// define all the propTypes for the book that is
// returned by the BooksAPI that is stored within
// the state of the component "BookDashboard" or
// "SearchDashboard"
Book.propTypes = {
  book: PropTypes.shape({
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
