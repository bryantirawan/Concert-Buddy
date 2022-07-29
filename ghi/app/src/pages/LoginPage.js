import { React, useContext } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  let navigate = useNavigate()

  return (
<>
<div className="my-5 container">
<form class="form-signin" onSubmit={loginUser}>
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                  <h1 className="card-title">Login</h1>
                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                      <input type="text" id="username" class="form-control" name="username" placeholder='Enter Username' />
                        <label htmlFor="username">Username</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mb-3">
                        <input type="password" name="password" className="form-control" placeholder='Enter Password' />
                          <label htmlFor="password1">Password</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-lg btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <h3> Don't have an account? </h3>
        <button className="btn btn-primary btn-lg " onClick={(e) => navigate('/sign-up')} >Register </button> 
  </form>
      </div>
    </>
  )
}
export default LoginPage

