import React, { Component } from 'react'
import Navbar from '../components/navbar/navbar.jsx';
import Sidebar from '../components/side_bar/side_bar.jsx';
import './main.css';
import Temel from '../components/temel/temel.jsx';
import {BrowserRouter as Router,Route} from 'react-router-dom'
class home extends Component {
  render() {
    return (
      <div className="main_main">
          <Navbar />
        <div className='main_body'>
          <Sidebar/>
          <Router>
            <Temel/>
          </Router>
        </div>
      </div>
    )
  }
}
export default home;
