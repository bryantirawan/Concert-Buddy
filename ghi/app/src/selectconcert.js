import React, {useEffect, useState} from 'react'; 

const getFullConcertName = (concert) => {
    return `Artist: ${concert.artist.name} Venue: ${concert.venue.name} Date: ${concert.eventDate}`;
}

export default function Concerts() {
    const [concerts, setConcerts] = useState([]);
    const [city, setCity] = useState('');
    const [artist, setArtist] = useState('');

    useEffect( () => {
        const fetchConcert = async () => {
            const concertResponse = await fetch(`http://localhost:8080/api/selectconcerts`); 
            const concertData = await concertResponse.json();
            setConcerts(concertData.setlist);
        }
        fetchConcert()
    }, []
    );

    const handleLocationSubmit = (e) => {
        e.preventDefault();
        const city_new = city.split(' ') 
        let final_city = city_new[0] 
        for (let i = 1; i < city_new.length; i++) {
            final_city += '%20'
            final_city += city_new[i]
        }

            const fetchConcert = async () => {
                const concertResponse = await fetch(`http://localhost:8080/api/selectconcertsforcity/${final_city}/&p=1`);
                const concertData = await concertResponse.json()
                console.log(concertData)
                setConcerts(concertData.concerts.setlist) 
            }
            fetchConcert()

    }
    const handleArtistSubmit = (e) => {
        e.preventDefault();
        const artist_new = artist.split(' ') 
        let final_artist = artist_new[0] 
        for (let i = 1; i < artist_new.length; i++) {
            final_artist += '%20'
            final_artist += artist_new[i]
        }

            const fetchConcert = async () => {
                const concertResponse = await fetch(`http://localhost:8090/api/concerts/artist/${final_artist}/`);
                const concertData = await concertResponse.json() 
                console.log(concertData)
                setConcerts(concertData.concerts.setlist) 
            }
            fetchConcert()

    }

    return (
        <>
        <div>
            <p>
            Hi
            </p>
            <form onSubmit={handleLocationSubmit}>
                <label>City:  </label>
                <input type="text" value={city} required onChange={(e) => {setCity(e.target.value)}} />
                <input type="submit" value="Fetch concerts for city"/>
            </form>
            <form onSubmit={handleArtistSubmit}>
                <label>City:  </label>
                <input type="text" value={artist} required onChange={(e) => {setArtist(e.target.value)}} />
                <input type="submit" value="Fetch concerts by artist"/>
            </form>

           {concerts.map((concert) => (
                <div>
                <p>
                    {getFullConcertName(concert)}
                </p>
                </div>
            )) 
            }  

        </div>

        </>
    )

}




