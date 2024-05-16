import React from 'react';
import './navbar.css'; // Navbar özel CSS
import {Link} from 'react-router-dom';


function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">SUSBEEZ</div>
      <div className="logo" style={{fontSize:'20px'}}><b style={{color:'red',fontWeight:'bold',fontSize:'16px'}}>Happy</b>Plant</div>
      <div className="menu">
        <Link to='/'><button className="menu-item active">Home</button></Link>
        <Link to='/tasks'><button className="menu-item">Run</button></Link>
        <Link to='/collabration'><button className="menu-item">Collobration</button></Link>
        <Link to='/results'><button className="menu-item special">Last</button></Link>
      </div>
    </header>
  );
}

export default Navbar;