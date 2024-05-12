import React, {useState, useEffect } from 'react';
import './temel/temel.css';
import axios from 'axios';

function Waste() {
    const [cures, setCures] = useState([])

    useEffect(() => {
        const getCures = () => {
            axios.get('http://localhost:8000/waste')
                .then((response) => {
                    setCures(Object.entries(response.data))
                })
                .catch(error => {
                    console.error("Error fetching cures:", error);
                });
        };
        getCures();
    }, []);

    return (
        <div className="temel_tablolar">
            <table className='tablolar' border="2">
               <thead>
               <tr>
                  <th>#</th>
                  <th>Firma Adı</th>
                  <th>Lokasyon</th>
                  <th>Yaptığı iş</th>
               </tr>
               </thead>
               <tbody>
                {cures.map((cure, index) => (
                    <tr>
                    <td>{cure[0][0]}</td>
                    <td>{cure[1][0]}</td>
                    <td>{cure[1][1]}</td>
                    <td>{cure[1][2]}</td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Waste;
