import React from 'react';
import Header from '../Header/Header';
import BookShelf from '../BookShelf/BookShelf';
import * as BooksAPI from '../BooksAPI/BooksAPI';
import '../../styles/book-dashboard.css';
import '../../styles/styles.css';


class BooksDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.moveBook = this.moveBook.bind(this);
  }

  componentDidMount() {
    const newState = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    };
    BooksAPI.getAll().then((data) => {
      Object.keys(data).forEach((index) => {
        if (data[index].shelf === 'currentlyReading') {
          newState.currentlyReading.push(data[index]);
        } else if (data[index].shelf === 'wantToRead') {
          newState.wantToRead.push(data[index]);
        } else {
          newState.read.push(data[index]);
        }
      });
      this.setState(newState);
    }).catch((error) => {
      window.console.log(`Unable to contact books API with error ${error}`);
    });
  }

  moveBook(book, toWhere) {
    console.log(book);
    console.log(this);
    console.log(toWhere);
  }

  render() {
    return (
      <div>
        <Header title="MyReads" />
        <div className="list-books-content">
          {Object.keys(this.state).map((shelfType) => {
            // split the type on camelcase to create the title of shelf
            let shelfName = shelfType.split(/(?=[A-Z])/).join(' ');
            shelfName = shelfName.charAt(0).toUpperCase() + shelfName.substr(1);
            return (<BookShelf
              key={shelfType}
              moveBook={this.moveBook}
              title={shelfName}
              books={this.state[shelfType]}
            />
            );
          })}
        </div>
      </div>
    );
  }
}

export default BooksDashboard;
