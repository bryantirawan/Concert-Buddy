import React, { useState, useEffect } from 'react'

const Fellowusersgoingtoconcert = () => {
  const [fellowusers, setFellowUsers] = useState([])
  
  useEffect( () => {
    getFellowUsers()
  }, [])

  const getFellowUsers = async() => {
    const response = await fetch('http://localhost:8080/api/concertfellowusers/3bb2e04c/')
    const data = await response.json() 
    setFellowUsers(data.users);
  } 



  return (
    <>
    <p>Other users going to the concert:</p>
    <ul>
      {fellowusers.map((fellowuser,idx) => (
        <li key={idx}>
          {fellowuser.email}
        </li>
      )
      )}

    </ul>
    </>
  )
}

export default Fellowusersgoingtoconcert