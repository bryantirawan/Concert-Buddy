import React, {useEffect, useState} from 'react'; 
import {
    useParams
  } from "react-router-dom";

import { Link, BrowserRouter as Router, Route } from "react-router-dom";
  



//   const HomePage = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [data, setData] = useState();
  
//     useEffect(() => {
//       fetch("https://swapi.dev/api/people/", {})
//         .then((res) => res.json())
//         .then((response) => {
//           setData(response.results);
//           setIsLoading(false);
//         })
//         .catch((error) => console.log(error));
//     }, []);
  



export default function ConcertDetail() {
    let { concert_id } = useParams();

    const [data, setData] = useState({});
    const [concerts, setConcerts] = useState([]);
    const [tickets, setTickets] = useState([]);
    //const [sell, setSell] = useState();

  
    //useEffect( () => {
     //   const fetchConcert = async () => {
            //const concertResponse = await fetch(`http://localhost:8080/api/selectconcerts`); 
    //         const concertData = await concertResponse.json();
    //         setConcerts(concertData.setlist);
    //     }
    //     fetchConcert()
    // }, []
    // );



   
    useEffect(() => {
        const fetchConcertDetail = async () => {
            const concertResponse = await fetch(`http://localhost:8080/api/concert/${concert_id}`)
            const concertData = await concertResponse.json();
            
            const ticketResponse = await fetch(`http://localhost:8090/api/tickets/`)
            const ticketData = await ticketResponse.json();
          
            let ticket_list = [];
            for (let tick of ticketData.tickets){
              if (tick.concert_id === concertData.concert_id){
                ticket_list.push(tick)
              }
            }
            
            setTickets(ticket_list);
            setData(concertData);
            
            // catch error for empty ticket error
        }
        fetchConcertDetail()
    }, []
    );


  //   useEffect(() => {
  //     const fetchTickets = async () => {
  //         const ticketResponse = await fetch(`http://localhost:8090/api/concerttickets/${concertData.id}`)
  //         const ticketData = await ticketResponse.json();
  //         setTickets(ticketData);
  //         console.log(ticketData)
  //     }
  //     fetchTickets()
  // }, []
  // );

    // useEffect(() => {
    //     fetch(`http://localhost:8100/api/concert/${concert_id}`, {})
    //       .then((res) => res.json())
    //       .then((response) => {
    //         setData(JSON.stringify(response));
    //         //setIsLoading(false);
    //         console.log(response)
    //       })
    //       .catch((error) => console.log(error));
    //   }, [concert_id]);
    


    
      const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
    
      

      return (
        <>
          
            <>
            <h1>Concert Details</h1>
              <h3>Venue:  {data.venue}</h3>
              <h3>City:  {data.city}</h3>
              <h3>Date:  { new Date(data.date).toLocaleDateString('en-US')}</h3>

              <h3>Artist:  {data.artist}</h3>
          


        <Link to={`/tickets/${concert_id}`} className="current"><button className="btn btn-primary btn-lg btn-block"type="button">
          Sell
     </button></Link>
      

<table>
    <thead>

        <tr>
             <th>Price</th>
            <th>Section</th>
            <th>Row</th>
            <th>Seat</th> 
            <th>Buy</th> 

        </tr>
    </thead>
        <tbody>
          {tickets && tickets.map((ticket,idx) => (

                <tr key={idx}>
                    <td>{ticket.price}</td>
                    <td>{ticket.section}</td>
                    <td>{ticket.row} </td>
                    <td>{ticket.seat} </td>
                    <td>
                    {/* <button className="btn btn-primary btn-lg btn-block" onClick={() => openInNewTab('https://google.com')}> */}
                    <button className="btn btn-primary btn-lg btn-block" >
           Buy
          </button>
                    </td>
                </tr>
            ))
        }
      
        </tbody>
    </table> 


        
           
            </>
          
        </>
      );
    };

