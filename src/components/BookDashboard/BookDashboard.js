import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import BookShelf from '../BookShelf/BookShelf';
import NoBooks from '../NoBooks/NoBooks';
import { getAll, update } from '../BooksAPI/BooksAPI';

class BooksDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.moveBook = this.moveBook.bind(this);
  }

  componentDidMount() {
    getAll()
      .then((data) => {
        this.setState({ books: data });
      })
      .catch((error) => {
        window.console.log(`Unable to contact books API with error ${error}`);
      });
  }

  moveBook(bookToChange, toWhere) {
    const { id } = bookToChange;
    update(bookToChange, toWhere);
    if (toWhere === 'none') {
      this.setState({ books: this.state.books.filter(book => book.id !== id) });
      return;
    }
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

  shouldDisplayBookshelfs(bookTypes) {
    let jsx = '';
    if (this.state.books.length === 0) {
      jsx = <NoBooks />;
    } else {
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

    return (
      <div>
        <Header title="MyReads" />
        <div className="list-books-content">
          {this.shouldDisplayBookshelfs(bookTypes)}
        </div>
        <div className="open-search">
          <Link className="open-search a" href="/search" to="/search">Search </Link>
        </div>
      </div>
    );
  }
}

export default BooksDashboard;
