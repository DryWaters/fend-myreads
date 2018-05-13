import React from 'react';
import PropTypes from 'prop-types';

// Simple header
const Header = ({ title }) => (
  <div className="list-books-title">
    <h1>{title}</h1>
  </div>
);

export default Header;

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: 'MyRead',
};
