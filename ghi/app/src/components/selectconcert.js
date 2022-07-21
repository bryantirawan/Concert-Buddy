import React, {useEffect, useState} from 'react';
import Toggle from './Toggle';

export default function Concerts() {
    const [concerts, setConcerts] = useState([]);
    const [city, setCity] = useState('');
    const [artist, setArtist] = useState('');
    const [toggled, setToggled] = useState(false);

    useEffect( () => {
        const fetchConcert = async () => {
            const concertResponse = await fetch(`http://localhost:8080/api/selectconcerts`);
            const concertData = await concertResponse.json();
            setConcerts(concertData.setlist);
        }
        fetchConcert()
    }, []
    );

    // const current = new Date();
    // const date = `${current.getDate()}-${('0' + (current.getMonth()+1)).slice(-2)}-${current.getFullYear()}`;


    const handleLocationSubmit = (e) => {
        e.preventDefault();
        const city_new = city.split(' ')
        let final_city = city_new[0]
        for (let i = 1; i < city_new.length; i++) {
            final_city += '%20'
            final_city += city_new[i]
        }
        fetch(`http://localhost:8080/api/selectconcertsforcity/${final_city}/&p=1`).then((concertResponse) => {
            if(concertResponse.ok) {
                return concertResponse.json();
            }
            throw new Error('Invalid Search Request');
        })
        .then((concertData) => {
            if (concertData.concerts.setlist) {
                for (let i in concertData.concerts.setlist){
                    const dateParts = concertData.concerts.setlist[i].eventDate.split("-");
                    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    concertData.concerts.setlist[i].eventDate = dateObject

                }
                setConcerts(concertData.concerts.setlist);
            }
            setArtist('');
        })
        .catch((error) => {
            console.log(error);
            setConcerts(undefined);
        });
            // const fetchConcert = async () => {
            //     const concertResponse = await fetch(`http://localhost:8080/api/selectconcertsforcity/${final_city}/&p=1`);
            //     const concertData = await concertResponse.json()
            //     console.log(concertData)
            //     setConcerts(concertData.concerts.setlist)
            // }
            // fetchConcert()
    }
    const handleArtistSubmit = (e) => {
        e.preventDefault();
        const artist_new = artist.split(' ')
        let final_artist = artist_new[0]
        for (let i = 1; i < artist_new.length; i++) {
            final_artist += '%20'
            final_artist += artist_new[i]
        }
        fetch(`http://localhost:8090/api/concerts/artist/${final_artist}/`).then((concertResponse) => {
            if(concertResponse.ok) {
                return concertResponse.json();
            }
            throw new Error('Invalid Search Request');
        })
        .then((concertData) => {
            if (concertData.concerts.setlist) {
                for (let i in concertData.concerts.setlist){
                    const dateParts = concertData.concerts.setlist[i].eventDate.split("-");
                    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    concertData.concerts.setlist[i].eventDate = dateObject

                }
                setConcerts(concertData.concerts.setlist);
            }
            else {
                setConcerts(undefined)
            }
            setCity('');
        })
        .catch((error) => {
            console.log(error);
            setConcerts(undefined);
        });




            // const fetchConcert = async () => {
            //     const concertResponse = await fetch(`http://localhost:8090/api/concerts/artist/${final_artist}/`);
            //     const concertData = await concertResponse.json()
            //     console.log(concertData)
            //     setConcerts(concertData.concerts.setlist)
            // }
            // fetchConcert()

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

    return (
        <>
        <div className='selectconcerts'>
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
            
    {concerts !== undefined ?
    (
    <div>
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
                        <form action={`http://localhost:8080/api/add/${concert.id}/`} method="POST">
                        <button>
                        I'm going!
                        </button>
                        </form>
                    </td>
                </tr>
            ))
        }
        </tbody>
    </table>
    </div>
    ) :
    (<p>Invalid Search Request</p>)
    }
    </div>
    </div>
    </>
    )
}
