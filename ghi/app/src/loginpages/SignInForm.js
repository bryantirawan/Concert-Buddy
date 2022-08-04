import { React, useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Link, NavLink } from 'react-router-dom';
import "./SignupPages.css"


const SignInForm = () => {
  let {loginUser} = useContext(AuthContext)

  return (
  <>
  <div className="App">
    <div className="appForm">
      <div className="pageSwitcher">
        <div className="formCenter">
            <form className="formFields" onSubmit={loginUser}>
              <div className="formField">
                    <NavLink
                      to="/sign-up"
                      className="formTitleLink"
                    >
                      Login
                    </NavLink>{" "}
              </div>
                <div className="formField">
                  <label className="formFieldLabel" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="formFieldInput"
                    placeholder="Enter your username"
                    name="username"
                  />
                </div>
                <div className="formField">
                  <label className="formFieldLabel" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="formFieldInput"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="formField">
                  <button className="formFieldButton">Sign In</button>{" "}
                  <Link to="/sign-up" className="formFieldLink">
                    Create an account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SignInForm;
