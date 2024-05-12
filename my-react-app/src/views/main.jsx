import React from 'react';
import Navbar from '../components/navbar/navbar.jsx';
import Sidebar from '../components/side_bar/side_bar.jsx';
import './main.css';
import Temel from '../components/temel/temel.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Results from '../components/results.jsx';
import Demo from '../components/demo.jsx';
import Cure from '../components/drugs.jsx';
import Waste from '../components/atık.jsx';

function Main() {
  return (
      <Router>
        <Navbar/>
        <div className="main_body">
          <Routes>
            <Route path='/tasks' element={
              <>
                <Sidebar />
                <Temel />
              </>
            } />
          </Routes>
          <Routes>
            <Route exact path='/' element={
              <>
                <Demo/>
              </>
            } />
          </Routes>
          <Routes>
            <Route path='/results' element={
              <>
                <Results/>
              </>
            } />
          </Routes>
          <Routes>
            <Route path='/cure' element={
              <>
                <Cure/>
              </>
            } />
          </Routes>
          <Routes>
            <Route path='/waste' element={
              <>
                <Waste/>
              </>
            } />
          </Routes>
        </div>
      </Router>
  );
}

export default Main;

