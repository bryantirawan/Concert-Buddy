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
              <Link
                to='/selectconcerts/'
                className='nav-links'
                onClick={closeMobileMenu}
                reloadDocument
              >
                Find a Buddy
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/selectconcerts/'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sell Tickets
              </Link>
            </li>
            <li>
                {user ? (
                  <Link className="nav-links" aria-current="page" to="/userconcerts/">
                 Concerts You're Going To
                </Link>
                ): (<></>)}
            </li>
            <li>
                {user ? (
                  <p className="nav-links" aria-current="page" onClick={logoutUser}>Logout</p>
                ): (
                  <Link className="nav-links" aria-current="page" to="/login/">
                 Login / SignUp 
                 </Link>
                )}
              </li>
          </ul>

          {user && <p className='nav-links'>Hello {user.username}</p>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
