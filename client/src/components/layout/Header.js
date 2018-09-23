import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Sidebar from './Sidebar';
import '../../App.css';
const Header = props => {
  const { branding } = props;
  return (

    <nav className="navbar navbar-expand-sm navbar-dark navbar-inverse navbar-fixed-top  color" >
      <div className="container-fluid margin1">
        <a href="/" className="navbar-brand mleft">
          {branding}
        </a>
       
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-home" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact/add" className="nav-link">
                <i className="fas fa-plus" /> Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <i className="fas fa-question" /> About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
   
  );
};

Header.defaultProps = {
  branding: 'My App'
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;
