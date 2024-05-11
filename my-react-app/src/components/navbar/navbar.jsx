import React from 'react';
import './navbar.css'; // Navbar özel CSS
import {Link} from 'react-router-dom';


function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">SUSBEEZ</div>
      <div className="menu">
        <button className="menu-item active"><Link to='/'>Home</Link></button>
        <button className="menu-item"><Link to='/tasks'>çalıştır</Link></button>
        <button className="menu-item"><Link to='/isbirligi'>işbiirliği</Link></button>
        <button className="menu-item special"><Link to='/'>Donate</Link></button>
      </div>
    </header>
  );
}

export default Navbar;