import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import BookShelf from '../BookShelf/BookShelf';
import { search, update } from '../BooksAPI/BooksAPI';
import NoBooks from '../NoBooks/NoBooks';

class SearchDashboard extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
    };
    // use lodash to debounce to keep from firing API requests
    // constantly as user enters search string
    this.onInputChange = debounce(this.onInputChange, 500);
    this.moveBook = this.moveBook.bind(this);
  }

  // fetches new books as long as user has entered something
  // if get return of data.error then that means no books were
  // found with that search string
  // it then sets the state to these new books fetched using
  // BooksAPI
  onInputChange(value) {
    if (value !== '') {
      search(value)
        .then((data) => {
          if (data.error) {
            this.setState({ books: [] });
          } else {
            this.setState({ books: data });
          }
        }).catch((error) => {
          window.console.log(`Unable to contact Books API with error ${error}`);
        });
    }
  }

  // updates the backend and also the local state of the selected book
  // changing the "shelf" attribute that represents the bookshelf that
  // it should be placed on.  Currently on the search page all books are
  // shown together, but additional feature could be added to create
  // book shelves within the search page as the local state is being updated
  moveBook(bookToChange, toWhere) {
    const { id } = bookToChange;
    update(bookToChange, toWhere);
    const newBooks = this.state.books.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          shelf: toWhere,
        };
      }
      return book;
    });
    this.setState({ books: newBooks });
  }

  // Use event.persist() on the onChange trigger because when you are using lodash
  // to supress the number of events, the target will disappear from the call stack.
  // event.persist() will store the target behind so that it can be called with the
  // moveBook function()
  render() {
    return (
      <div>
        <div className="search-books-bar">
          <Link className="close-search" href="/" to="/" aria-label="Back to main" />
          <input onChange={(e) => { e.persist(); this.onInputChange(e.target.value); }} type="text" placeholder="Search by title or author" />
        </div>
        {this.state.books.length !== 0 ?
          <BookShelf moveBook={this.moveBook} books={this.state.books} /> : <NoBooks />}
      </div>
    );
  }
}

export default SearchDashboard;
