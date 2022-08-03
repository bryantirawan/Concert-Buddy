import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../context/AuthContext';
import {
    useParams, useNavigate
  } from "react-router-dom";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from '../Footer';



export default function Userconcerts() {
    const [userconcerts, setUserConcerts] = useState([])
    const {authTokens, logoutUser} = useContext(AuthContext)
    const { concert_id } = useParams();
    let {user} = useContext(AuthContext)
    let navigate = useNavigate()
    const yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);

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
             data.concerts.sort((a,b) => Date.parse(a.date) - Date.parse(b.date))

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

        let res = await fetch(`http://localhost:8080/buddy/user/${user.user_id}/`, jsonBody);
        if (res.status === 200){
            alert('Concert successfully removed')
            navigate(`/userconcerts/`)
        } else {
            alert('concert unable to be removed')
            navigate(`/userconcerts/`)
        }
    }

const handleRemoveConcertSubmit = async (e, concID) => {
    //e.preventDefault();
  //POST to Concert and PUT to User all in one
  putConcertandputUser(concID)
  //window.location.reload()
}

    return (
        <>
        <br></br>
        <div className="tabletoavoidfooter">

        {userconcerts.length > 0 ? (    
        <div className="my-4 container bg-light">
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
            {userconcerts.filter(userconcert => ((new Date(userconcert.date))) >= (yesterday)).map((userconcert,idx) => (

            //  {userconcerts.map((userconcert,idx) => (
                    <tr key={idx}>
                        <td>{userconcert.artist}</td>
                        <td>{userconcert.venue}</td>
                        <td>{userconcert.city}</td>
                        <td>{new Date(userconcert.date).toLocaleDateString(undefined, {timeZone: "UTC"})}</td>
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
        </div>):(<>
                    <div className="px-4 py-4 my-4 mt-0 text-center bg-secondary">
                    <img className="bg-black rounded shadow d-block mx-auto mb-1" alt="" width="600" />
                    <h1 className="display-6 fw-bold">SEE WHAT'S NEW</h1>
                    <p>Looking for something to do? See what events are coming up and book tickets.</p>
                    <div className="col-lg-6 mx-auto">
                      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <Link to="/selectconcerts" className="btn btn-light btn-lg px-4 gap-3">Search Events</Link>
                      </div>
                    </div>
                  </div>
        
        
        
        
        <h1 align="center">You have no concerts yet.</h1>
        
        </>
        )}

        </div>
        <br></br>
        <Footer />
       

        </>
  )
}