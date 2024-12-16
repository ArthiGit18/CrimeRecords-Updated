import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'; // MUI hamburger menu icon
import CloseIcon from '@mui/icons-material/Close'; // MUI close menu icon

const Navbar = ({ isBlack }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`navbar_wrapper ${isBlack ? 'black' : ''}`}>
      <div className="nav_logo">
        <h1>Crime Chronicles</h1>
      </div>
      <div className="hamburger_menu" onClick={toggleMenu}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
      <div className={`nav_items ${menuOpen ? 'show' : ''}`}>
        <ul className="navbar">
          <li className="nav-item">
            <a href="/">Home</a>
          </li>
          <li className="nav-item">
            <a
              href="#about-section"
              onClick={(e) => {
                e.preventDefault(); // Prevent default navigation
                document.getElementById('about-section')?.scrollIntoView({
                  behavior: 'smooth', // Smooth scrolling
                  block: 'start', // Align to the top of the section
                });
              }}
            >
              About
            </a>
          </li>
          <li className="nav-item">
            <p>Criminal Records</p>
            <ul className="dropdown-menu">
              <li><a href="/search">Search by Name</a></li>
              <li><a href="/search">Search by Location</a></li>
              <li><a href="/infamousCriminals">Infamous Criminals</a></li>
              <li><a href="/topWanted">Top 10 Wanted</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <p>Unsolved Mysteries</p>
            <ul className="dropdown-menu">
              <li><a href="/coldCases">Cold Cases</a></li>
              <li><a href="/missingPerson">Missing Persons</a></li>
              <li><a href="/">Conspiracies</a></li>
              <li><a href="/">Share Your Leads</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <p>Forensic Files</p>
            <ul className="dropdown-menu">
              <li><a 
               href="#forensicfacts"
               onClick={(e) => {
                 e.preventDefault(); // Prevent default navigation
                 document.getElementById('forensicfacts')?.scrollIntoView({
                   behavior: 'smooth', // Smooth scrolling
                   block: 'start', // Align to the top of the section
                 });
               }}>How Forensics Work</a></li>
              <li><a 
               href="/forensicCases"
              >Famous Evidence Cases</a></li>
              <li><a 
               href="#forensicfacts"
               onClick={(e) => {
                 e.preventDefault(); // Prevent default navigation
                 document.getElementById('forensicfacts')?.scrollIntoView({
                   behavior: 'smooth', // Smooth scrolling
                   block: 'start', // Align to the top of the section
                 });
               }}>Tools of the Trade</a></li>
              <li><a 
               href="#forensicfacts"
               onClick={(e) => {
                 e.preventDefault(); // Prevent default navigation
                 document.getElementById('forensicfacts')?.scrollIntoView({
                   behavior: 'smooth', // Smooth scrolling
                   block: 'start', // Align to the top of the section
                 });
               }}>Learn Forensics</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a href="#contact"
               onClick={(e) => {
                 e.preventDefault(); // Prevent default navigation
                 document.getElementById('contact')?.scrollIntoView({
                   behavior: 'smooth', // Smooth scrolling
                   block: 'start', // Align to the top of the section
                 });
               }}>Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
