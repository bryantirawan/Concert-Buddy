import { React, useContext } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigate, Link, NavLink } from 'react-router-dom';
import "./SignupPages.css"


const SignInForm = () => {
  let {loginUser} = useContext(AuthContext)
  let navigate = useNavigate()

  return (
<>
<div className="App">


<div className="pageSwitcher">
{/* <div className="formTitle">
              <NavLink
                to="/sign-up"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Login
              </NavLink>{" "}
            </div> */}
<div className="formCenter">
        <form className="formFields" onSubmit={loginUser}>
        <div className="formField">
              <NavLink
                to="/sign-up"
                activeClassName="formTitleLink-active"
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

          {/* <div className="socialMediaButtons">
            <div className="facebookButton">
              <FacebookLoginButton onClick={() => alert("Hello")} />
            </div>
            <div className="instagramButton">
              <InstagramLoginButton onClick={() => alert("Hello")} />
            </div>
          </div> */}
        </form>
      </div>
      </div>
    </div>
    </div>
    </>
  )
}
export default SignInForm;
