import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import BookDashboard from './components/BookDashboard';
import SearchDashboard from './components/SearchDashboard';
import './styles/styles.css';

// Setup two routes for either main page or searching for books
const jsx = (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={BookDashboard} />
      <Route path="/search" component={SearchDashboard} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(jsx, document.getElementById('root'));
