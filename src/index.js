import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import BookDashboard from './components/BookDashboard/BookDashboard';
import './styles/styles.css';

const jsx = (
  <BrowserRouter>
    <Route exact path="/" component={BookDashboard} />
    <Route path="/search" component={Search} />
  </BrowserRouter>
);

ReactDOM.render(jsx, document.getElementById('root'));
