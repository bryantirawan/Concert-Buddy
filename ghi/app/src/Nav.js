import { NavLink } from "react-router-dom";
import React, {useContext} from 'react'
import AuthContext from "./context/AuthContext";

function Nav() {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">Concert Buddy</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/selectconcerts/">
                 Select Concert
                </NavLink>
              </li>

              <li>

              <NavLink className="nav-link" aria-current="page" to="/concertdetail/">
                  Concert Detail
                  </NavLink>
                {user ? (
                  <p className="nav-link" onClick={logoutUser}>Logout</p>
                ): (
                  <NavLink className="nav-link" aria-current="page" to="/login/">
                 Login
                </NavLink>
                )}
              </li>
              <li>
                {user ? (
                  <NavLink className="nav-link" aria-current="page" to="/userconcerts/">
                 User's Concerts
                </NavLink>
                ): (<p>hi</p>)}
              </li>
              <li className="nav-item">

                <NavLink className="nav-link" aria-current="page" to="/">
                  Page 3
                </NavLink>


              </li>

            </ul>
            {user && <p>Hello {user.username}</p>}

          </div>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
