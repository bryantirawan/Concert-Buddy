import { React, useContext, useState } from "react"
import AuthContext from "../context/AuthContext"
// import "./signup.css";
//import React, {useEffect, useState } from 'react';
//import { useContext } from 'react'
import {
  useParams
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from "react-router-dom";
import "./SignupPages.css"
// import {
//     FacebookLoginButton,
//     InstagramLoginButton
//   } from "react-social-login-buttons";
import Toggle from "../components/Toggle";

function SignUpForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  let { concert_id } = useParams();
  let navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    const submit = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'username':e.target.username.value, 'email':e.target.email.value, 'password1':e.target.password1.value, 'password2':e.target.password2.value})
    }
    let res = await fetch('http://localhost:8080/buddy/user/', submit)
      let resJson = await res.json();
    if (res.status === 201) {
      alert('user successfully made')
      navigate('/')
    } else {
      alert('Error processing registration')
    }
  } catch (err) {
    console.error('error', err);
  }
}

let {loginUser} = useContext(AuthContext)


return (
    <div className="/react-auth-ui/">
    <div className="App">
    <div className="appForm">
    <div className="pageSwitcher">
    <div className="formCenter">
      <form onSubmit={handleSubmit} className="formFields">
      <div className="formField">
              <NavLink
                to="/login"
                className="formTitleLink"
              >
                Sign up
              </NavLink>{" "}
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="name">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="formFieldInput"
            placeholder="Enter your desired username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password1"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Confirm Password
          </label>
          <input
            type="password"
            id="password2"
            className="formFieldInput"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            E-Mail Address
          </label>
          <input
            type="email"
            id="email"
            className="formFieldInput"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formField">
          <button className="formFieldButton">Sign Up</button>{" "}
          <Link to="/login" className="formFieldLink">
            I'm already a member
          </Link>
        </div>
      </form>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}
export default SignUpForm;
