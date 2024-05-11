import React from 'react';
import './navbar.css'; // Navbar özel CSS

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">SUSBEEZ</div>
      <div className="menu">
        <button className="menu-item">Home</button>
        <button className="menu-item">Page</button>
        <button className="menu-item">Page</button>
        <button className="menu-item special">Button</button>
      </div>
    </header>
  );
}

export default Navbar;