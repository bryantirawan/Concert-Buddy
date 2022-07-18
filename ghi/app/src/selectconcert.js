
export default function Concerts() {
    const [concerts, setConcerts] = useState([]);
    const [city, setCity] = useState('');
    const current = new Date();
    const date = `${current.getDate()}-${('0' + (current.getMonth()+1)).slice(-2)}-${current.getFullYear()}`;

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
            <form onSubmit={handleSubmit}>
                <label>City:  </label>
                <input type="text" value={city} required onChange={(e) => {setCity(e.target.value)}} />
                <input type="submit" value="Fetch concerts for city"/>
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
        {concerts.filter(concert => date<=concert.eventDate).map((concert,idx) => (
                <tr key={idx}>
                    <td>{concert.artist.name}</td>  
                    <td>{concert.venue.name}</td>
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
    </table>
        </div>

        </>
    )

}
