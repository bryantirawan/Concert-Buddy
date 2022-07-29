import React, {useState, useEffect, useContext} from 'react'
import AuthContext from './context/AuthContext'
import {
    useParams, useNavigate
  } from "react-router-dom";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from './components/Footer';



export default function Userconcerts() {
    const [userconcerts, setUserConcerts] = useState([])
    const {authTokens, logoutUser} = useContext(AuthContext)
    const { concert_id } = useParams();
    let {user} = useContext(AuthContext)
    let navigate = useNavigate()


    useEffect(() => {
        getUserConcerts()
    }, [userconcerts])

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


    const putConcertandputUser = async (concID) => {
        const concertToRemove = {
            "concert": concID
        }
        const jsonBody = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(concertToRemove)
        }
        console.log('concertToRemove', concertToRemove)

        let res = await fetch(`http://localhost:8080/buddy/user/${user.user_id}/`, jsonBody);
        if (res.status === 200){
            console.log('User removed as fellow user and concert removed from user model')
            alert('Concert successfully removed')
            navigate(`/userconcerts/`)
        } else {
            alert('concert unable to be removed')
            navigate(`/userconcerts/`)
        }
    }

const handleRemoveConcertSubmit = async (e, concID) => {
    e.preventDefault();
  //POST to Concert and PUT to User all in one
  putConcertandputUser(concID)
}

    return (
        <>
        <br></br>
        {userconcerts.length > 0 ? (    <div className="container">
        <h1 align="center">Concerts You're Going To</h1>
        <table className="table table-hover table-striped">
        <thead>
            <tr>
                <th>Artist</th>
                <th>Venue</th>
                <th>City</th>
                <th>Date</th>
                <th>Find buddies</th>
                <th>Sell extra tickets</th>
                <th>Buy ticket</th>
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
                            <form action={`http://localhost:3000/tickets/${userconcert.concert_id}`}>
                            <button className="btn btn-primary">
                            Sell
                            </button>
                            </form>
                        </td>
                        <td>
                            <form action={`http://localhost:3000/concertdetail/${userconcert.concert_id}`}>
                            <button className="btn btn-primary">
                            Buy
                            </button>
                            </form>
                        </td>
                        <td>
                        <form onSubmit={(e) => handleRemoveConcertSubmit(e, userconcert.concert_id)}>
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
        </div>):(<h1 align="center">You have no concerts yet.</h1>)}

        <Footer />
        </>
  )
}
