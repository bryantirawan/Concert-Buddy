import React, { useState, useEffect } from 'react'
import {
  useParams
} from "react-router-dom";


const Fellowusersgoingtoconcert = () => {
  const [fellowusers, setFellowUsers] = useState([])
  const { concert_id } = useParams();
  
  useEffect( () => {
    getFellowUsers()
  }, [])

  const getFellowUsers = async() => {
    const response = await fetch(`http://localhost:8080/api/concertfellowusers/${concert_id}/`)
    const data = await response.json() 
    setFellowUsers(data.users);
  } 



  return (
    <>




<table  className="table table-striped table-bordered ">
    <thead>

        <tr>
             <th>Concert Buddies!</th>

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

    {/* <p>Other users going to the concert:</p>
    <ul>
      {fellowusers.map((fellowuser,idx) => (
        <li key={idx}>
          {fellowuser.email}
          
        </li>
      )
      )}

    </ul> */}
    </>
  )
}

export default Fellowusersgoingtoconcert