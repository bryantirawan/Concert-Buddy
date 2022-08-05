import React, { useState, useEffect } from 'react'
import {
  useParams, useNavigate
} from "react-router-dom";
import Footer from '../Footer';


const Fellowusersgoingtoconcert = () => {
  const [fellowusers, setFellowUsers] = useState([])
  const { concert_id } = useParams();
  let navigate = useNavigate()


  useEffect( () => {
    const getFellowUsers = async() => {
      const response = await fetch(`http://localhost:8080/api/concertfellowusers/${concert_id}/`)
      const data = await response.json()
      setFellowUsers(data.users);
    }
    getFellowUsers()
  }, [])


  return (
    <>
        <div className="container">

    <br></br>
    <div className="tabletoavoidfooter">

<table  className="table table-striped table-bordered ">
    <thead>
        <tr>
             <th><h2>Potential concert buddies: Feel free to reach out to other users!</h2></th>
        </tr>
    </thead>
        <tbody>
        {fellowusers.map((fellowuser,idx) => (
                <tr key={idx}>
                    <td>{fellowuser.email}</td>
                </tr>
            ))
        }

        </tbody>
    </table>

                        
                        <button className="btn btn-sm btn-primary" onClick={() => navigate('/userconcerts/')}>Go Back</button> 



    <br></br>

    </div>
    <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          right: 0
        }}
      >
        </div>
    <Footer />
    </div>
    </>
  )
}

export default Fellowusersgoingtoconcert
