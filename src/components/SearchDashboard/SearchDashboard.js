import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../BookShelf/BookShelf';

class SearchDashboard extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      books: [],
    };
  }

  render() {
    return (
      <div>
        <div className="search-books-bar">
          <Link className="close-search" href="/" to="/" aria-label="Back to main" />
          <input type="text" placeholder="Search by title or author" />
        </div>
        <BookShelf />
      </div>
    );
  }
}

export default SearchDashboard;
