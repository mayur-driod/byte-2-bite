import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';


function NavBar() {
  return (
    <div className="topnav">
      <link href="https://fonts.googleapis.com/css2?family=Sixtyfour+Convergence&display=swap" rel="stylesheet"></link>

      {/* Top Navigation (Dashboard on the left, Profile on the right) */}
      <nav className="nav-links">
        <NavLink to="/Dashboard"><img src="https://cdn-icons-png.flaticon.com/128/6015/6015685.png" alt="" height={25} width={25}/></NavLink>
        <NavLink to="/Profile"><img src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="" height={25} width={25}  /></NavLink>      
      </nav>

      {/* Bottom-left Navigation (About Us & Contact) */}
      <nav className="bottom-links">
        <NavLink to="/About">AboutUs </NavLink>
        <NavLink to="/Contact">Contact </NavLink>
        <NavLink to="/FAQ">FAQs</NavLink>
      </nav>
    </div>
  );
}

export default NavBar;