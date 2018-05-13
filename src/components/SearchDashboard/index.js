import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import BookShelf from '../BookShelf';
import { getAll, search, update } from '../BooksAPI';
import NoBooks from '../NoBooks';

class SearchDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedBooks: [],
      usersBooks: new Map(),
    };
    // use lodash to debounce to keep from firing API requests
    // constantly as user enters search string
    this.onInputChange = debounce(this.onInputChange, 500);
    this.moveBook = this.moveBook.bind(this);
  }

  // fetch all books that the current user has from the BooksAPI
  // when the application starts and creates a hashmap for faster
  // lookup to set the right shelf for the searched books
  componentDidMount() {
    this.updateUsersBooks();
  }

  // fetches new books as long as user has entered something
  // if get return of data.error then that means no books were
  // found with that search string
  // it then sets the state to these new books fetched using
  // BooksAPI.  If search returns books, updates the book shelf
  // based on the user's current shelves
  onInputChange(value) {
    if (value !== '') {
      search(value)
        .then((data) => {
          if (data.error) {
            this.setState({ searchedBooks: [] });
          } else {
            this.setState({ searchedBooks: data });
          }
        })
        .then(() => this.updateBookshelves())
        .catch((error) => {
          window.console.log(`Unable to contact Books API with error ${error}`);
        });
    } else {
      this.setState({ searchedBooks: [] });
    }
  }

  // pulls all user's books and creates a map for their current shelf for
  // fast look up
  updateUsersBooks() {
    getAll()
      .then((data) => {
        this.mapCurrentUsersBooks(data);
      }).then(() => {
        this.updateBookshelves();
      })
      .catch((error) => {
        window.console.log(`Unable to contact books API with error ${error}`);
      });
  }

  // creates a map for the book id and the shelf it should be placed on
  mapCurrentUsersBooks(data) {
    const usersBookMap = new Map();
    data.forEach((book) => {
      usersBookMap.set(book.id, book.shelf);
    });
    this.setState({ usersBooks: usersBookMap });
  }

  // sets the searched results bookshelf
  updateBookshelves() {
    if (this.state.searchedBooks.length !== 0) {
      const updatedBooks = this.state.searchedBooks.map((book) => {
        if (this.state.usersBooks.has(book.id)) {
          return {
            ...book,
            shelf: this.state.usersBooks.get(book.id),
          };
        }
        return book;
      });
      this.setState({ searchedBooks: updatedBooks });
    }
  }

  // updates the backend and also the local state of the selected book
  // changing the "shelf" attribute that represents the bookshelf that
  // it should be placed on.  It also updates the local map containing
  // the correct shelf
  moveBook(bookToChange, toWhere) {
    const { id } = bookToChange;
    update(bookToChange, toWhere);
    this.updateLocalMap(id, toWhere);
    const newBooks = this.state.searchedBooks.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          shelf: toWhere,
        };
      }
      return book;
    });
    this.setState({ searchedBooks: newBooks });
  }

  // updates the local hashmap of book ids and shelves
  updateLocalMap(bookId, toWhere) {
    const newMap = new Map(this.state.usersBooks);
    if (newMap.has(bookId)) {
      newMap.set(bookId, toWhere);
    } else {
      newMap.set(bookId, toWhere);
    }
    this.setState({ usersBooks: newMap });
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
        {this.state.searchedBooks.length !== 0 ?
          <BookShelf moveBook={this.moveBook} books={this.state.searchedBooks} /> : <NoBooks />}
      </div>
    );
  }
}

export default SearchDashboard;
