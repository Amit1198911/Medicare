import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-blue-600">MediCare</h1>
        <nav>
          {/* Hamburger menu for mobile */}
          <button
            className="lg:hidden text-gray-700 hover:text-blue-500"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Links container */}
          <ul
            className={`lg:flex lg:space-x-6 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}
          >
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-blue-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="text-gray-700 hover:text-blue-500">
                Doctors
              </Link>
            </li>
            <li>
              <Link to="/patient" className="text-gray-700 hover:text-blue-500">
                Patients
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 hover:text-blue-500">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
