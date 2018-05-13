import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import BookShelf from '../BookShelf';
import NoBooks from '../NoBooks';
import { getAll, update } from '../BooksAPI';

class BooksDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.moveBook = this.moveBook.bind(this);
  }

  // fetch all books that the current user has from the BooksAPI
  // when the application starts
  componentDidMount() {
    getAll()
      .then((data) => {
        this.setState({ books: data });
      })
      .catch((error) => {
        window.console.log(`Unable to contact books API with error ${error}`);
      });
  }

  // Changes the book "shelf" status and pushes that information to the backend
  // using the Books API.  If a book is set to "none" then it is removed from the
  // local state so that the page will update correctly if no books are left
  moveBook(bookToChange, toWhere) {
    const { id } = bookToChange;
    update(bookToChange, toWhere);
    if (toWhere === 'none') {
      this.setState({ books: this.state.books.filter(book => book.id !== id) });
      return;
    }
    // map over all books and return all parts of the book object, only
    // modifing the shelf attribute that the backend uses to know which
    // shelf to display on for the user
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

  // checks if should either show the no books component if the user has no
  // books checked out, or all bookshelves if they have at least one.
  // If there are books, then it divides them up by their "shelf" attribute
  shouldDisplayBookshelves() {
    let jsx = '';
    if (this.state.books.length === 0) {
      jsx = <NoBooks />;
    } else {
      const bookTypes = {
        currentlyReading: {
          title: 'Currently Reading',
          books: [],
        },
        wantToRead: {
          title: 'Want to Read',
          books: [],
        },
        read: {
          title: 'Read',
          books: [],
        },
      };

      this.state.books.forEach((book) => {
        if (book.shelf === 'currentlyReading') {
          bookTypes.currentlyReading.books.push(book);
        } else if (book.shelf === 'wantToRead') {
          bookTypes.wantToRead.books.push(book);
        } else if (book.shelf === 'read') {
          bookTypes.read.books.push(book);
        }
      });

      // push down the moveBook function from this class down to the
      // "BookShelf" component and then to the "Book" where it will
      // be used
      jsx = Object.keys(bookTypes).map(shelfType => (
        <BookShelf
          key={shelfType}
          moveBook={this.moveBook}
          title={bookTypes[shelfType].title}
          books={bookTypes[shelfType].books}
          bookShelf={shelfType}
        />
      ));
    }
    return jsx;
  }

  render() {
    return (
      <div>
        <Header title="MyReads" />
        <div className="list-books-content">
          {this.shouldDisplayBookshelves()}
        </div>
        <div className="open-search">
          <Link className="open-search a" href="/search" to="/search" aria-label="To search">Search</Link>
        </div>
      </div>
    );
  }
}

export default BooksDashboard;
