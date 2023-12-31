import React, {useEffect, useState } from 'react';
import Toggle from '../Toggle';
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import { useParams } from "react-router-dom";



export default function Concerts() {

    let navigate = useNavigate()
    const [concerts, setConcerts] = useState([]);
    const [city, setCity] = useState('');
    const [artist, setArtist] = useState('');
    const [toggled, setToggled] = useState(false);
    //city is false, artist is true
    const [invalid, setInvalid] = useState(false);
    const [page, setPage] = useState(1);
    let { location } = useParams();
    let {user} = useContext(AuthContext)
    const yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date());


    useEffect( () => {
        const fetchConcerts = async() => {
            const concertResponse = await fetch(`${process.env.REACT_APP_BUDDY_API}/api/selectconcertsforcity/${location}/&p=${page}`)
            if(concertResponse.ok) {
                const concertData = await concertResponse.json();
                if (concertData.concerts.setlist) {
                    for (let i in concertData.concerts.setlist){
                        const dateParts = concertData.concerts.setlist[i].eventDate.split("-");
                        const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                        concertData.concerts.setlist[i].eventDate = dateObject
                    }
                    setConcerts(concertData.concerts.setlist);
                    let concList = [concertData.concerts.setlist.filter(concert => ((new Date(concert.eventDate))) >= (Date.now()))]
                    if (concList[0].length === 0){
                        setConcerts(0)
                    }
                    setArtist('');
                    setInvalid(false)

                } else {
                    if (location !== undefined) {
                        setInvalid(true)
                        setConcerts([])
                    }
                }
            }
        }

        fetchConcerts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]
    );

    const handleLocationSubmit = async (e) => {
        e.preventDefault();
        const location = city.replaceAll(" ", "%20");
        const city_new = city.split(' ')
        let final_city = city_new[0]
        for (let i = 1; i < city_new.length; i++) {
            final_city += '%20'
            final_city += city_new[i]
        }
        const concertResponse = await fetch(`${process.env.REACT_APP_BUDDY_API}/api/selectconcertsforcity/${final_city}/&p=1`)
        if(concertResponse.ok) {
            const concertData = await concertResponse.json();
            if (concertData.concerts.setlist) {
                for (let i in concertData.concerts.setlist){
                    const dateParts = concertData.concerts.setlist[i].eventDate.split("-");
                    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    concertData.concerts.setlist[i].eventDate = dateObject
                }
                let concList = [concertData.concerts.setlist.filter(concert => ((new Date(concert.eventDate))) >= yesterday)]
                let concListO = concertData.concerts.setlist.filter(concert => ((new Date(concert.eventDate))) >= yesterday)

                if (concList[0].length === 0){
                    setConcerts(0)
                }
                else{
                setConcerts(concListO);
                console.log (concertData.concerts.setlist)
                console.log(concListO)
                }

                setArtist('');
                setInvalid(false);
                navigate(`/selectconcerts/${location}`, { replace: true });


            } else {
                console.error('concertData:', concertResponse);
                setInvalid(true);
                setConcerts([]);
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
        const concertResponse = await fetch(`${process.env.REACT_APP_BUDDY_API}/api/concerts/artist/${final_artist}/`)
        if(concertResponse.ok) {
            const concertData = await concertResponse.json();
            if (concertData.concerts.setlist) {
                for (let i in concertData.concerts.setlist){
                    const dateParts = concertData.concerts.setlist[i].eventDate.split("-");
                    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    concertData.concerts.setlist[i].eventDate = dateObject
                }
                setConcerts(concertData.concerts.setlist);
                let concList = [concertData.concerts.setlist.filter(concert => (( new Date(concert.eventDate))) >= (Date.now()))]
                if (concList[0].length === 0){
                    setConcerts(0)
                }
                setCity('')
                setInvalid(false)
            } else {
                console.error('concertData:', concertResponse);
                setInvalid(true)
                setConcerts([])
            }
        }
    }

    const fetchConcerttoAdd = async (concID) => {
        const concertResponse = await fetch(`${process.env.REACT_APP_BUDDY_API}/api/add/${concID}/`);
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

            let res = await fetch(`${process.env.REACT_APP_BUDDY_API}/buddy/concert/`, jsonBody);
            if (res.status === 200){
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
        const concertURL = `${process.env.REACT_APP_BUDDY_API}/buddy/concert/`
        const data = {venue, city, date, artist, concert_id, venue_id, artist_id}
        const request = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        let res = await fetch(concertURL, request);
        console.log(res)
        navigate(`/tickets/${concert_id}/`)
    }

    const handleConcertDetails = (e) => {
        navigate(`/login/`)
    }

    return (
        <>
        <div className='selectconcerts'>
            <div>
            <Toggle onChange={(e) => setToggled(e.target.checked)} />
            <p>  Search by {toggled ? "Artist": "City "}</p>
            <div className='entry'>
                { toggled ?
            <form onSubmit={handleArtistSubmit}>
            <input className="form-control" type="text" value={artist} required onChange={(e) => {setArtist(e.target.value)}}/>
            </form>
            :
            <form onSubmit={handleLocationSubmit}>
            <input className="form-control" type="text" value={city} required onChange={(e) => {setCity(e.target.value); setPage(1)}} />
            </form>
            }
        <div>
        <p></p>
        </div>


    {invalid &&
        <p>Invalid Search Request</p>
    }

    {concerts.length > 0 &&
    (<>
    <table className="table table-dark table-striped">
    <thead>
        <tr>
            <th>Artist</th>
            <th>City</th>
            <th>Venue</th>
            <th>Date</th>
            {user ? (<th>Wanna go?</th>) : <th>Concert Details</th>}
            {user ?
            (<th>Have a ticket to sell?</th>) : <></> }

        </tr>
    </thead>
        <tbody>
        {concerts.filter(concert => ((concert.eventDate)) >= (yesterday)).reverse().map((concert,idx) => (

                <tr key={idx}>
                    <td>{concert.artist.name}</td>
                    <td>{concert.venue.city.name}</td>
                    <td>{concert.venue.name}</td>
                    <td>{concert.eventDate.toLocaleDateString(undefined, {timeZone: "UTC"})} </td>
                    {user ?
                    (<td>
                    <form onSubmit={(e) => handleImGoingSubmit(e, concert.id)}>
                    <button className="btn btn-success" type="submit">
                        I'm going!
                        </button>
                    </form>

                    </td>
                    ) : (<td>
                    <form onSubmit={(e) => handleConcertDetails(e)}>
                    <button className="btn btn-success" type="submit">
                        Login to See Concert Details
                        </button>
                    </form>

                    </td>)}
                    {user ? (<td> <form onSubmit={(e) => handleAddConcertSubmit(e, concert.venue.name, concert.venue.city.name, concert.eventDate, concert.artist.name, concert.id, concert.venue.id, concert.artist.mbid)}>
                        <button className="btn btn-primary" type="submit">
                        Sell ticket
                        </button>
                    </form>
                    </td>):(<></>)}
                </tr>
            ))
        }
        </tbody>
    </table>

    { toggled ?
            (<>
            {page > 1 &&
                <form onSubmit={handleArtistSubmit}>
                    <button className="btn btn-primary" onClick={() => setPage(page - 1)}>
                        Previous Page
                    </button>
                </form>
            }
            {concerts.length === 20 &&
            <form onSubmit={handleArtistSubmit}>
                <button className="btn btn-success" onClick={() => setPage(page + 1)}>
                    Next Page
                </button>
            </form>}

            </>) : (
            <>
            {page > 1 &&

                <form onSubmit={handleLocationSubmit}>
                    <button className="btn btn-primary" onClick={() => setPage(page - 1)}>
                        Previous Page
                    </button>
                </form>
            }
            {concerts.length === 20 &&

                <form onSubmit={handleLocationSubmit}>
                    <button className="btn btn-success" onClick={() => setPage(page + 1)}>
                        Next Page
                    </button>
                </form>
            }
            </>
            )
    }
    </>
    )}
        {concerts === 0 &&
    (<>
    { toggled ?
            (<>

            <p>No concerts matching search</p>
            {page > 1 &&
                <form onSubmit={handleArtistSubmit}>
                    <button className="btn btn-primary" onClick={() => setPage(page - 1)}>
                        Previous Page
                    </button>
                </form>
            }
            </>) : (
            <>
            <p>No concerts matching search</p>
            {page > 1 &&
                <form onSubmit={handleLocationSubmit}>
                    <button className="btn btn-primary" onClick={() => setPage(page - 1)}>
                        Previous Page
                    </button>
                </form>
            }

            </>
            )

    }
    </>)
    }
    </div>
    </div>
    </div>
    <Footer/>
    </>
    )
}
