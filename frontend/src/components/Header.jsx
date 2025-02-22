import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropdown from './Header/ProfileDropdown';
import Container from './Container';
import logo from '../assets/favicon.png';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus
    },
  ];

  return (
    <header className='py-3 shadow bg-darkBlue'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <img src={logo} alt="logo" className='w-12' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.slug}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue rounded-full text-lightBlue'
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <ProfileDropdown />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
