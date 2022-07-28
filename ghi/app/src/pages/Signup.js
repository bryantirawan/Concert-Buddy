import { React, useContext, useState } from "react"
//import AuthContext from "../context/AuthContext"
// import "./signup.css";
//import React, {useEffect, useState } from 'react';
//import { useContext } from 'react'
import {
  useParams
} from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 

function SignupPage() {
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
    console.log(submit)
    let res = await fetch('http://localhost:8080/buddy/user/', submit)
          console.log('user? Added');
      let resJson = await res.json();
    if (res.status === 201) {
      alert('user successfully made')
      navigate('/')
    } else {
      console.log(res.status);
      alert('Error processing registration')
    }
  } catch (err) {
    console.log('error', err);
  }
}

  return (
    <>
      <div className="my-5 container">
        <div className="row">
          <div className="col col-sm-auto">
            <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/images/img-8.jpg" />
          </div>
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit} className="form" id="create-attendee-form">
                  <h1 className="card-title">Sign Up</h1>
                  <p className="mb-3">
                    Make an account.
                  </p>
                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={(e) => setUsername(e.target.value)} required placeholder="Username" type="text" value={username} id="username" name="username" className="form-control" />
                        <label htmlFor="username">Username</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={(e) => setEmail(e.target.value)} required placeholder="Email" type="text" value={email} id="email" name="email" className="form-control" />
                        <label htmlFor="email">Email</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input onChange={(e) => setPassword1(e.target.value)} required placeholder="Password1" type="password" value={password1} id="password1" name="password" className="form-control" />
                          <label htmlFor="password1">Password</label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input onChange={(e) => setPassword2(e.target.value)} required placeholder="Password2" type="password" value={password2} id="password2" name="confirm password" className="form-control" />
                          <label htmlFor="password2">Confirm Password</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-lg btn-primary">Create Account</button>
                </form>
              </div>
            </div>
            <br></br>
        <h3> Alread have an account? </h3>
        <button className="btn btn-primary btn-lg " onClick={(e) => navigate('/login')}>Login </button> 
          </div>
          
        </div>
        
      </div>
    </>
)
}
export default SignupPage;



