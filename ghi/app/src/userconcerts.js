import React, {useState, useEffect, useContext} from 'react'
import AuthContext from './context/AuthContext'
import {
    useParams
  } from "react-router-dom";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
  
  

export default function Userconcerts() {
    const [userconcerts, setUserConcerts] = useState([])
    const {authTokens, logoutUser} = useContext(AuthContext)
    const { concert_id } = useParams();

    
    useEffect(() => {
        getUserConcerts()

    }, [])

    const getUserConcerts = async() => {
        const response = await fetch('http://localhost:8080/api/userconcerts/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        const data = await response.json()
        if(response.status===200){        
            setUserConcerts(data.concerts)
        }else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }

    }

    return (
    <>
    <table className="table table-hover table-striped">
    <thead>
        <tr>
            <th>Artist</th>
            <th>Venue</th>
            <th>City</th>
            <th>Date</th>
            <th>Other users going to this concert</th>
            <th>Buy ticket if available</th>
            <th>I can no longer go</th>
        </tr>
    </thead>
        <tbody>
        {userconcerts.map((userconcert,idx) => (
                <tr key={idx}>
                    <td>{userconcert.artist}</td>  
                    <td>{userconcert.venue}</td>
                    <td>{userconcert.city}</td>
                    <td>{new Date(userconcert.date).toLocaleDateString('en-US')}</td>
                    <td>
                    <Link to={`/fellowusers/${userconcert.concert_id}`} className="current"><button className="btn btn-success"type="button">
          Other Users Going
     </button></Link>
                    </td>
                    <td>
                        <form action={`http://localhost:3000/concertdetail/${userconcert.concert_id}`}>
                        <button className="btn btn-primary">        
                        Buy
                        </button>
                        </form>
                    </td>
                    <td>
                        <form action={`/`}> 
                        {/* will need its own handle submit after making adding delete/PUT logic   */}
                        <button className="btn btn-primary">        
                        Remove
                        </button>
                        </form>
                    </td>
                </tr>
            )) 
            }  
        </tbody>
    </table>

    
    </>









  )
}

