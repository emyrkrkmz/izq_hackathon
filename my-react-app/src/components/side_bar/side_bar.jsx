import React, {useContext} from 'react';
import './side_bar.css'; 
import { GlobalContext } from '../../context/GlobalState';
function Sidebar() {

  const {selected, setSelected} = useContext(GlobalContext);


  return (

            <div className="sidebar">
              <div className="section">
                <h2>Ürünler</h2>
                  <input type='radio' id='domates' name='xd' value="domates" onChange={() => {
                    setSelected("domates");
                  }}></input>
                  <label htmlFor="domates">Domates</label>
                  <br></br>
                  <input type='radio' id='patates' name='xd' value="patates" onChange={() => {
                    setSelected("patates");
                  }}></input>
                  <label htmlFor="patates">Patates</label>
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
          )
}

export default Sidebar;
