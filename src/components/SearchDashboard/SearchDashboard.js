import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import BookShelf from '../BookShelf/BookShelf';
import { search } from '../BooksAPI/BooksAPI';

class SearchDashboard extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
    };
    this.onInputChange = debounce(this.onInputChange, 1000);
  }

  onInputChange(event) {
    search(event.target.value).then(function(data) {
      console.log(data);
    })
  }

  render() {
    return (
      <div>
        <div className="search-books-bar">
          <Link className="close-search" href="/" to="/" aria-label="Back to main" />
          <input onChange={this.onInputChange} type="text" placeholder="Search by title or author" />
        </div>
        <BookShelf />
      </div>
    );
  }
}

export default SearchDashboard;
