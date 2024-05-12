import React from 'react';
import './navbar.css'; // Navbar özel CSS
import {Link} from 'react-router-dom';


function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">SUSBEEZ</div>
      <div className="menu">
        <Link to='/'><button className="menu-item active">Home</button></Link>
        <Link to='/tasks'><button className="menu-item">çalıştır</button></Link>
        <Link to='/isbirligi'><button className="menu-item">işbiirliği</button></Link>
        <Link to='/results'><button className="menu-item special">En Son</button></Link>
      </div>
    </header>
  );
}

export default Navbar;