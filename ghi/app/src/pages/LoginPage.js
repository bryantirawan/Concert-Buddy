import { React, useContext } from "react"
import AuthContext from "../context/AuthContext"


const LoginPage = () => {

  let {loginUser} = useContext(AuthContext)

  return (
    <>
    <div>
      <h1> Login with your credentails: </h1>
        <form onSubmit={loginUser}>
            <input type="text" name="username" placeholder='Enter Username' /> 
            <input type="password" name="password" placeholder='Enter Password' /> 
            <input type="submit" /> 
        </form>
    </div>
    <div>
    <h1> Don't have an account? </h1>
        <form action='/signup'>
            <button>Sign up</button>
        </form>
    </div>






    
    </>
  )
}

export default LoginPage