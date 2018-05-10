import React from 'react';
import BookShelf from '../BookShelf/BookShelf';
import * as BooksAPI from '../BooksAPI/BooksAPI';
import '../../styles/book-dashboard.css';
import '../../styles/styles.css';


class BooksDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    return (
      <div>
        <BookShelf title="Currently Reading" books={this.state.currentlyReading} />
        <BookShelf title="Want to Read" books={this.state.wantToRead} />
        <BookShelf title="Reading" books={this.state.read} />
      </div>
    );
  }
}

export default BooksDashboard;
