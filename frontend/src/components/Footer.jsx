import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/favicon.png';

function Footer() {
  return (
    <footer className="bg-darkBlue text-lightBlue py-8">
      <div className="container mx-auto flex flex-col items-center">
        <div className="mb-4">
          <Link to="/">
            <img src={logo} alt="logo" className='w-12' />
          </Link>
        </div>
        <div className="text-center">
          <p>&copy; 2024 Blog App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
