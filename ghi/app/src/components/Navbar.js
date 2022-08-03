import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import './Navbar.css';
import Dropdown from 'react-bootstrap/Dropdown';



function Navbar() {
  let {user, logoutUser} = useContext(AuthContext)
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
                Find A Buddy
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
                  <Dropdown className="nav-links">
                    <Dropdown.Toggle variant="dark">
                      {user.username}
                      <Dropdown.Menu>
                        <Dropdown.Item href="/mytickets/">Purchased Tickets</Dropdown.Item>
                        <Dropdown.Item href="/userconcerts/">Concerts I Am Attending</Dropdown.Item>
                        <Dropdown.Item href="/sellertickets">My Tickets for Sale</Dropdown.Item>
                        <Dropdown.Item href="/"  variant="dark" onClick={logoutUser}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown.Toggle>
                    </Dropdown>
                ): (
                  <Link className="nav-links" aria-current="page" to="/login/">
                 Login
                 </Link>
                )}
              </li>

          </ul>


        </div>
      </nav>
    </>
  );
}

export default Navbar;
