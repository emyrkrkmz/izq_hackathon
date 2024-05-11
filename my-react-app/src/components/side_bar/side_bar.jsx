import React from 'react';
import './side_bar.css'; 
import CheckboxExample from '../checks';
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="section">
        <h2>Ürünler</h2>
        <form action="">
          <input type='radio' id='domates' name='xd'></input>
          <label htmlFor="domates">Domates</label>
          <br></br>
          <input type='radio' id='patates' name='xd'></input>
          <label htmlFor="patates">Patates</label>
        </form>
      </div>
      <div className="section">
        <h2>Kurumsal</h2>
        <ul>
          <li>İletişim</li>
          <li>Adres</li>
          <li>Diğer</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
