import React, {useState, useEffect, useContext} from 'react'
import AuthContext from './context/AuthContext'

export default function Userconcerts() {
    const [userconcerts, setUserCocnerts] = useState([])
    const {authTokens} = useContext(AuthContext)
    
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
        setUserCocnerts(data.concerts)
    }

    console.log('userconcerts', userconcerts)


    const current = new Date();
    const date = `${current.getDate()}-${('0' + (current.getMonth()+1)).slice(-2)}-${current.getFullYear()}`;



    return (
    <>
    <table>
    <thead>
        <tr>
            <th>Artist</th>
            <th>Venue</th>
            <th>City</th>
            <th>Date</th>
            <th>Other users going to this concert</th>
            <th>Buy ticket if available</th>
        </tr>
    </thead>
        <tbody>
        {//userconcerts.filter(userconcert => date<=userconcert.eventDate).map((userconcert,idx) => (
        userconcerts.map((userconcert,idx) => (
                <tr key={idx}>
                    <td>{userconcert.artist}</td>  
                    <td>{userconcert.venue}</td>
                    <td>{userconcert.city}</td>
                    <td>{userconcert.date}</td>
                    <td>
                        <button>        
                        Users going
                        </button>
                    </td>
                    <td>
                        <button>        
                        Buy
                        </button>
                    </td>
                </tr>
            )) 
            }  
        </tbody>
    </table>

    
    </>









  )
}

