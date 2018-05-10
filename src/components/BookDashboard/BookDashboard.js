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
    BooksAPI.getAll().then((data) => {
      this.setState(data);
    }).catch((error) => {
      window.console.log(`Unable to contact books API with error ${error}`);
    });
  }

  render() {
    return (
      <div>
        <BookShelf />
        <BookShelf />
        <BookShelf />
      </div>
    );
  }
}

export default BooksDashboard;
