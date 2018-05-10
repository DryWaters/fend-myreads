import React from 'react';
import Header from '../Header/Header';
import BookShelf from '../BookShelf/BookShelf';
import * as BooksAPI from '../BooksAPI/BooksAPI';
import '../../styles/book-dashboard.css';
import '../../styles/styles.css';


class BooksDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.moveBook = this.moveBook.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((data) => {
        this.setState({ books: data });
      })
      .catch((error) => {
        window.console.log(`Unable to contact books API with error ${error}`);
      });
  }

  moveBook(bookId, toWhere) {
    const newBooks = this.state.books.map((book) => {
      if (book.id === bookId) {
        return {
          ...book,
          shelf: toWhere,
        };
      }
      return book;
    });
    this.setState({ books: newBooks });
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
      } else {
        bookTypes.read.books.push(book);
      }
    });

    return (
      <div>
        <Header title="MyReads" />
        <div className="list-books-content">
          {Object.keys(bookTypes).map(shelfType => (
            <BookShelf
              key={shelfType}
              moveBook={this.moveBook}
              title={bookTypes[shelfType].title}
              books={bookTypes[shelfType].books}
              bookShelf={shelfType}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BooksDashboard;
