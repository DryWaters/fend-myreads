import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import BookDashboard from './components/BookDashboard/BookDashboard';
import SearchDashboard from './components/SearchDashboard/SearchDashboard';
import './styles/styles.css';

const jsx = (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={BookDashboard} />
      <Route path="/search" component={SearchDashboard} />
    </div>

  </BrowserRouter>
);

ReactDOM.render(jsx, document.getElementById('root'));
