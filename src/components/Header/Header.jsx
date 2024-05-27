import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/register">Registro</Link></li>
          <li><Link to="/food-list">Menú</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
