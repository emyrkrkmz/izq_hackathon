import React, { useContext, useState, useEffect } from 'react';
import './temel/temel.css';
import axios from 'axios';

function Cure() {
    const [cures, setCures] = useState([])

    useEffect(() => {
        const getCures = () => {
            axios.get('http://localhost:8000/cure')
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
            <div className='tablolar'>
                {cures.map((cure, index) => (
                    <div key={index}>
                        {cure[0]}: {cure[1]}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cure;
