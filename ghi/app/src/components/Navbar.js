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
                        <Dropdown.Item>
                          <Link className="dropdown-links" aria-current="page" to="/mytickets/"> Purchased Tickets</Link>
                         </Dropdown.Item>
                        <Dropdown.Item>
                          <Link className="dropdown-links" aria-current="page" to="/userconcerts/">Concerts I Am Attending</Link>
                          </Dropdown.Item>
                        <Dropdown.Item>
                          <Link className="dropdown-links" aria-current="page" to="/sellertickets">My Tickets for sale</Link>
                         </Dropdown.Item>
                        <Dropdown.Item to="/"  variant="dark" onClick={logoutUser}>
                          <Link className="dropdown-links" aria-current="page" to="/">Logout</Link>
                          </Dropdown.Item>
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
