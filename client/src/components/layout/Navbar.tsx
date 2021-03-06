
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export interface NavbarProps {
    icon: string;
    title: string;
}

const Navbar = (props: NavbarProps ) => {
  const {icon, title} = props;
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon}></i> &nbsp; {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};
Navbar.defaultProps = {
  title: 'Currency Exchanger',
  icon: 'fab fa-github'
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
