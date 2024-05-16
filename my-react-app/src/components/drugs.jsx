import React, {useState, useEffect } from 'react';
import './temel/temel.css';
import axios from 'axios';

function Cure() {
    const [wastes, setwastes] = useState([])

    useEffect(() => {
        const getwastes = () => {
            axios.get('http://localhost:8000/cure')
                .then((response) => {
                    setwastes(Object.entries(response.data))
                })
                .catch(error => {
                    console.error("Error fetching wastes:", error);
                });
        };
        getwastes();
    }, []);

    return (
        <div className="temel_tablolar">
            <table className='tablolar' border="1">
                <thead>
               <tr>
                  <th>#</th>
                  <th>Firma Adı</th>
                  <th>Yaptığı iş</th>
               </tr>
               </thead>
               <tbody>
                {wastes.map((waste, index) => (
                    <tr>
                    <td>{waste[0][0]}</td>
                    <td>{waste[1][0]}</td>
                    <td>{waste[1][1]}</td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Cure;
