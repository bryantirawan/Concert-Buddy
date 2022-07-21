import React, { useState, useEffect, useContext } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthContext from '../context/AuthContext';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
  let {user, logoutUser} = useContext(AuthContext)
  return (

    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Concert Buddy
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/buddy' className='nav-links' onClick={closeMobileMenu}>
                Find a Buddy
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/selectconcerts/'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Select Concerts
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/selltickets'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sell Tickets
              </Link>
            </li>
            <li>
                {user ? (
                  <Link className="nav-link" aria-current="page" to="/userconcerts/">
                 User's Concerts
                </Link>
                ): (<p>hi</p>)}
              </li>


            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
          {user && <p>Hello {user.username}</p>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
