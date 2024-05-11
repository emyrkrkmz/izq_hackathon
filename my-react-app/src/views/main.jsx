import React from 'react';
import Navbar from '../components/navbar/navbar.jsx';
import Sidebar from '../components/side_bar/side_bar.jsx';
import './main.css';
import Temel from '../components/temel/temel.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Results from '../components/results.jsx';


function Main() {
  return (
      <Router>
        <Navbar/>
        <div className="main_body">
          <Routes>
            <Route path='/' element={
              <>
                <Sidebar />
                <Temel />
              </>
            } />
          </Routes>

          <Routes>
            <Route path='/results' element={
              <>
                <Results />
              </>
            } />
          </Routes>
        </div>
      </Router>
  );
}

export default Main;

