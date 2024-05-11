import React, { Component } from 'react'
import Navbar from '../components/navbar/navbar.jsx';
import Sidebar from '../components/side_bar/side_bar.jsx';
import Aside from '../components/aside/aside.jsx';
import './home.css';
import Temel from '../components/temel/temel.jsx';
class home extends Component {
  render() {
    return (
      <div className="home_main">
          <Navbar />
        <div className='home_body'>
          <Sidebar/>
          <Temel/>
        </div>
      </div>
    )
  }
}
export default home;
