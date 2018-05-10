import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link } from 'react-router-dom'
import BookDashboard from './components/BookDashboard/BookDashboard';
import './styles/styles.css'

const jsx = (
  <BrowserRouter>
    <BookDashboard />
  </BrowserRouter>
);

ReactDOM.render(jsx, document.getElementById('root'))