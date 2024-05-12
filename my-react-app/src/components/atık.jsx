import React, { useContext, useState, useEffect } from 'react';
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
            <div className='tablolar'>
                {cures.map((cure, index) => (
                    <div key={index}>
                        {cure[1][2]}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Waste;
