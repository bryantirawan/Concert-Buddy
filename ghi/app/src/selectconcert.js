import React, {useEffect, useState} from 'react'; 

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

    const current = new Date();
    const date = `${current.getDate()}-${('0' + (current.getMonth()+1)).slice(-2)}-${current.getFullYear()}`;
    const day = `${current.getDate()}`;
    const month = `${('0' + (current.getMonth()+1)).slice(-2)}`;



    const handleSubmit = (e) => {
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
                console.log('setlist', concertData.concerts.setlist)
                if (concertData.concerts.setlist) {
                    for (let i in concertData.concerts.setlist){
                        const dateParts = concertData.concerts.setlist[i].eventDate.split("-");
                        const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                        concertData.concerts.setlist[i].eventDate = dateObject

                    } 
                    setConcerts(concertData.concerts.setlist) 

                }
                    // const concertResponse = await fetch(`http://localhost:8080/api/selectconcertsforcity/Chicago/&p=1`);
                
                    // const concertData = await concertResponse.json() 

                    //  console.log(concertData.artist)
                    // // concertData.artist.name = "errpr"
                    // // concertData.eventDate = date
                    // console.log('setlist', concertData.concerts.setlist)

                    // setConcerts(concertData.concerts.setlist) 

                    
               
                
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
                const concertResponse = await fetch(`http://localhost:8080/api/concerts/artist/${final_artist}/`);
                const concertData = await concertResponse.json() 
                console.log('setlist', concertData.concerts.setlist)
             
                // var dateParts = concertData.concerts.setlist[0].eventDate.split("-");

                // var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                // console.log(dateObject)
                if (concertData.concerts.setlist) {
                    for (let i in concertData.concerts.setlist){
                        const dateParts = concertData.concerts.setlist[i].eventDate.split("-");
                        const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                        concertData.concerts.setlist[i].eventDate = dateObject

                    } 

                setConcerts(concertData.concerts.setlist) 
            }
        }
            fetchConcert()

    }
    
//     const dates = licitacoes
//     .filter((bigN) => new Date(bigN.licitacoesDate) < currentDate)
//     .map((newNumber) => newNumber.licitacoesDate);
//   console.log(dates)


  //new Date(concert.eventDate) >= date
    return (
        <>
        <div>
            <p>
            Hi
            </p>
            <form onSubmit={handleSubmit}>
                <label>City:  </label>
                <input type="text" value={city} required onChange={(e) => {setCity(e.target.value)}} />
                <input type="submit" value="Fetch concerts for city"/>
            </form>
            <form onSubmit={handleArtistSubmit}>
                <label>City:  </label>
                <input type="text" value={artist} required onChange={(e) => {setArtist(e.target.value)}} />
                <input type="submit" value="Fetch concerts by artist"/>
            </form>
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
        {/* {concerts.filter(concert => date<=concert.eventDate).map((concert,idx) => ( */}
        {concerts.filter(concert => ((concert.eventDate)) >= (Date.now())).map((concert,idx) => (
//Date.now()
                <tr key={idx}>
                    <td>{concert.artist.name}</td>  
                    <td>{concert.venue.name}</td>
                    <td>{concert.eventDate.toLocaleDateString()} </td> 
                    <td>
                        <form action={`http://localhost:8100/api/add/${concert.id}/`} method="POST">
                        <button>        
                        Save concert to concert model in concert microservice
                        </button>
                        </form> 
                    </td>
                </tr>
            )) 
            }  
        </tbody>
    </table>
    {/* <table>
    <thead>
        <tr>
            <th>Artist</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Save Concert</th>
        </tr>
    </thead>
        <tbody>
            
        {/* {concerts.filter(concert => date<=concert.eventDate).map((concert,idx) => ( */}
        {/* {concerts.filter(concert => date).map((concert,idx) => (

                <tr key={idx}>
                    <td>{concert.artist.name}</td>  
                    <td>{concert.venue.name} x { Date.parse(concert.eventDate)}</td>
                    <td>{concert.eventDate}</td>
                    <td>
                        <form action={`http://localhost:8100/api/add/${concert.id}/`} method="POST">
                        <button>        
                        Save concert to concert model in concert microservice
                        </button>
                        </form> 
                    </td>
                </tr>
            )) 
            }  
        </tbody>
    </table> */} 
        </div>

        </>
    )

}
