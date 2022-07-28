import React, {useEffect, useState } from 'react';
import Toggle from './Toggle';
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';



export default function Concerts() {

    let navigate = useNavigate()

    const [concerts, setConcerts] = useState([]);
    const [city, setCity] = useState('');
    const [artist, setArtist] = useState('');
    const [toggled, setToggled] = useState(false);
    let {user} = useContext(AuthContext)


    const handleLocationSubmit = async (e) => {
        e.preventDefault();


        const city_new = city.split(' ')
        let final_city = city_new[0]
        for (let i = 1; i < city_new.length; i++) {
            final_city += '%20'
            final_city += city_new[i]
        }
        const concertResponse = await fetch(`http://localhost:8080/api/selectconcertsforcity/${final_city}/&p=1`)
        if(concertResponse.ok) {
            const concertData = await concertResponse.json();
            if (concertData.concerts.setlist) {
                for (let i in concertData.concerts.setlist){
                    const dateParts = concertData.concerts.setlist[i].eventDate.split("-");
                    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    concertData.concerts.setlist[i].eventDate = dateObject
                }
                setConcerts(concertData.concerts.setlist);
            } else {
                console.error('concertData:', concertResponse);
                setConcerts(undefined)
            }
        }
    }
    const handleArtistSubmit = async (e) => {
        e.preventDefault();

        const artist_new = artist.split(' ')
        let final_artist = artist_new[0]
        for (let i = 1; i < artist_new.length; i++) {
            final_artist += '%20'
            final_artist += artist_new[i]
        }
        const concertResponse = await fetch(`http://localhost:8090/api/concerts/artist/${final_artist}/`)
        if(concertResponse.ok) {
            const concertData = await concertResponse.json();
            if (concertData.concerts.setlist) {
                for (let i in concertData.concerts.setlist){
                    const dateParts = concertData.concerts.setlist[i].eventDate.split("-");
                    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    concertData.concerts.setlist[i].eventDate = dateObject
                }
                setConcerts(concertData.concerts.setlist);
            } else {
                console.error('concertData:', concertResponse);
                setConcerts(undefined)
            }
        }
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        if (toggled === false) {
            handleArtistSubmit()
        } else {
        handleLocationSubmit();
        }
      }
    };

    const fetchConcerttoAdd = async (concID) => {
        const concertResponse = await fetch(`http://localhost:8080/api/add/${concID}/`);
        const concertData = await concertResponse.json()
        return concertData
    }

    const addConcertandPutUser = async (concID) => {
            const concertToAdd = await fetchConcerttoAdd(concID)
            concertToAdd["fellow_user"] = [{
                "id": user.user_id
            }
            ]
            const jsonBody = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(concertToAdd)
            }

            let res = await fetch(`http://localhost:8080/buddy/concert/`, jsonBody);
            if (res.status === 200){
                console.log('concert added successfully and user attached to fellow user now needs to redirect')
                navigate(`/concertdetail/${concID}`)
            } else {
                alert('concert unable to be added')
            }
        }

    const handleImGoingSubmit = async (e, concID) => {
        e.preventDefault();
      //POST to Concert and PUT to User all in one
      addConcertandPutUser(concID)
    }

    const handleAddConcertSubmit = async(e, venue, city, date, artist, concert_id, venue_id, artist_id) => {
        e.preventDefault();
        const concertURL = `http://localhost:8080/buddy/concert/`
        const data = {venue, city, date, artist, concert_id, venue_id, artist_id}
        console.log(data)
        const request = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        let res = await fetch(concertURL, request);
        console.log("Concert Added")
        navigate(`/tickets/${concert_id}/`)
    }

    return (
        <>
        <div className='selectconcerts'>
            <div>
            <Toggle onChange={(e) => setToggled(e.target.checked)} />
            <p>  Search by {toggled ? "City ": "Artist "}</p>
            <div className='entry'>
                { toggled ?
            <form onSubmit={handleLocationSubmit}>
                <input type="text" value={city} required onChange={(e) => {setCity(e.target.value)}} onKeyPress={handleKeypress}/>
            </form>
            :
            <form onSubmit={handleArtistSubmit}>
                <input type="text" value={artist} required onChange={(e) => {setArtist(e.target.value)}} onKeyPress={handleKeypress}/>
            </form>
            }
        </div>

    {concerts !== undefined ?
    (
    <table>
    <thead>
        <tr>
            <th>Artist</th>
            <th>City</th>

            <th>Venue</th>
            <th>Date</th>
            {user ? (<th>Wanna go?</th>) : (<th>Want to find a buddy? Log in first</th>)}
            {user ? (<th>Have a ticket to sell?</th>) : (<th>Log in first to sell a ticket</th>)}



        </tr>
    </thead>
        <tbody>
        {concerts.filter(concert => ((concert.eventDate)) >= (Date.now())).map((concert,idx) => (
                <tr key={idx}>
                    <td>{concert.artist.name}</td>
                    <td>{concert.venue.city.name}</td>
                    <td>{concert.venue.name}</td>
                    <td>{concert.eventDate.toLocaleDateString()} </td>
                    {user ?                     (<td>
                    <form onSubmit={(e) => handleImGoingSubmit(e, concert.id)}>
                        <button type="submit">
                        I'm going!
                        </button>
                    </form>
                    </td>) : (<td></td>)}

                    <td>
                    <form onSubmit={(e) => handleAddConcertSubmit(e, concert.venue.name, concert.venue.city.name, concert.eventDate, concert.artist.name, concert.id, concert.venue.id, concert.artist.mbid)}>
                        <button type="submit">
                        Sell ticket
                        </button>
                    </form>
                    </td>
                </tr>
            ))
        }
        </tbody>
    </table>
    ) :
    (<p>Invalid Search Request</p>)
    }
    </div>
    </div>
    </>
    )
}
