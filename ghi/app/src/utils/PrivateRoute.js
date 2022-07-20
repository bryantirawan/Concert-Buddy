import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
const PrivateRoute = ({children}) => {
    // private route for checking if user is authenticated, 
    // add token to be used instead of hard coded true or false
    let {user} = useContext(AuthContext)
    return(
        user ? children: <Navigate to="/login"/>
    )
}

export default PrivateRoute;


