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
                        <input type="password" name="password" class="form-control" placeholder='Enter Password' />
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


{/* 
<>
    <div>
      <h1> Login with your credentails: </h1>
        <form onSubmit={loginUser}>
            <input type="text" name="username" placeholder='Enter Username' /> 
            <input type="password" name="password" placeholder='Enter Password' /> 
            <input type="submit" /> 
        </form> */}

 {/* // //     <form class="form-signin" onSubmit={loginUser}>
    // //         <input type="text" name="username" placeholder='Enter Username' /> 
    // //         <input type="password" name="password" placeholder='Enter Password' /> 
    // //         <input type="submit" /> 
    // //     </form> */}



{/* <form class="form-signin" onSubmit={loginUser}>
      <img class="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="text" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form> */}