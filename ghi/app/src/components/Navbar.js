import React, { useState, useEffect, useContext } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import './Navbar.css';

function Navbar() {
  let {user, logoutUser} = useContext(AuthContext)
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

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Concert Buddy
            <i className='fab fa-typo3' />
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
                  <Link className="nav-links" aria-current="page" to="/userconcerts/">
                 User's Concerts
                </Link>
                ): (<p>hi</p>)}
            </li>
            <li>  
                {user ? (
                  <p className="nav-links" onClick={logoutUser}>Logout</p>
                ): (
                  <Link className="nav-links" aria-current="page" to="/login/">
                 Login
                 </Link>
                )}
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
        </div>
      </nav>
    </>
  );
}

export default Navbar;
