import React, {useEffect, useState} from 'react';
import Toggle from '../Toggle';
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext';

function SearchToSellTickets() {
    const [concerts, setConcerts] = useState([]);
    const [city, setCity] = useState('');
    const [artist, setArtist] = useState('');
    const [toggled, setToggled] = useState(false);
    let {user} = useContext(AuthContext)
    console.log('user from userContext', user)

    useEffect( () => {
        const fetchConcert = async () => {
            const concertResponse = await fetch(`http://localhost:8080/api/selectconcerts`);
            const concertData = await concertResponse.json();
            setConcerts(concertData.setlist);
        }
        fetchConcert()
    }, []
    );

    const current = new Date();
    const date = `${current.getDate()}-${('0' + (current.getMonth()+1)).slice(-2)}-${current.getFullYear()}`;


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
        if (toggled == false) {
            handleArtistSubmit()
        } else {
        handleLocationSubmit();
        }
      }
    };

    return (
        <>

        <div className='selltickets'>
        <div>
            <Toggle onChange={(e) => setToggled(e.target.checked)} />
            <p>  Search by {toggled ? "City ": "Artist "}</p>

            <div className='entry'>
                { toggled ?
            <form onSubmit={handleLocationSubmit}>
                {/* <label>City:  </label> */}
                <input type="text" value={city} required onChange={(e) => {setCity(e.target.value)}} onKeyPress={handleKeypress}/>
                {/* <input type="submit" value="Fetch concerts for city"/> */}
            </form>
            :
            <form onSubmit={handleArtistSubmit}>
                {/* <label>Artist:  </label> */}
                <input type="text" value={artist} required onChange={(e) => {setArtist(e.target.value)}} onKeyPress={handleKeypress}/>
                {/* <input type="submit" value="Fetch concerts by artist"/> */}
            </form>
            }
        </div>
        <p></p>



        <div>
        </div>
    {concerts !== undefined ?
    (

    <table>
    <thead>

        <tr>
            <th>Artist</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Save Concert</th> 
        </tr>
    </thead>
        <tbody>

        {concerts.filter(concert => ((concert.eventDate)) >= (Date.now())).map((concert,idx) => (
                <tr key={idx}>
                    <td>{concert.artist.name}</td>
                    <td>{concert.venue.name}</td>
                    <td>{concert.eventDate.toLocaleDateString()} </td>
                    <td>
                        <form action={`http://localhost:3000/tickets/${concert.id}/`}>
                            <button >
                            Sell ticket for this concert
                            </button>
                        </form>
                    </td>
                </tr>
            ))
        }
        </tbody>
    </table>) :
    (<p>Invalid Search Request</p>)
    }

    </div>

    </div>
    </>
    )

}
export default SearchToSellTickets
