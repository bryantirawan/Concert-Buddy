import { React, useContext } from "react"
import AuthContext from "../context/AuthContext"
import "./signup.css";


const LoginPage = () => {

  let {loginUser} = useContext(AuthContext)

  return (



    
    <><link href="signin.css" rel="stylesheet"></link>
    <div>
      <form class="form-signin" onSubmit={loginUser}>
        <label for="username" class="sr-only">Email address</label>

        <input type="text" id="username" class="form-control" name="username" placeholder='Enter Username' />
        <input type="password" name="password" class="form-control" placeholder='Enter Password' />
        {/* <input type="submit" />  */}
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </div></>

  )
}

export default LoginPage

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